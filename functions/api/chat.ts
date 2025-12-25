interface Env {
  ASSETS: any;
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
  CF_ACCOUNT_ID: string;
  CF_API_TOKEN: string;
  CF_AI_MODEL?: string;
  PUBLIC_SITE_URL?: string;
}

type RagChunk = {
  title: string;
  url: string;
  content: string;
  embedding: number[];
};

type RagIndex = {
  chunks: RagChunk[];
};

type ChatRequest = {
  message: string;
  conversation_history?: Array<{ role: "user" | "assistant"; content: string }>;
};

function normalizeQuery(q: string) {
  return (q || "").trim().replace(/\s+/g, " ");
}

function keywordFallbackScore(q: string, text: string) {
  const words = q.toLowerCase().split(/\W+/).filter(Boolean);
  const t = text.toLowerCase();
  let score = 0;
  for (const w of words) {
    if (t.includes(w)) score += 1;
  }
  return score;
}

function isActiveProductStatus(status: string | null | undefined) {
  return status !== "Phased Out" && status !== "Removal Requested" && status !== "Removal Pending";
}

let productsCache: any[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000;

async function fetchSupabaseProducts(env: Env): Promise<any[]> {
  const now = Date.now();
  if (productsCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    return productsCache;
  }
  
  const supabaseUrl = env.VITE_SUPABASE_URL;
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return [];

  try {
    const url = `${String(supabaseUrl).replace(/\/$/, "")}/rest/v1/products?select=*&order=created_at.desc`;
    const resp = await fetch(url, {
      headers: {
        apikey: String(supabaseAnonKey),
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    });
    if (!resp.ok) return productsCache || [];
    
    const data = (await resp.json()) as any[];
    const products = Array.isArray(data) ? data : [];
    
    productsCache = products;
    cacheTimestamp = now;
    
    return products;
  } catch (e) {
    return productsCache || [];
  }
}

async function loadIndex(env: Env): Promise<RagIndex> {
  try {
    const res = await env.ASSETS.fetch("http://internal/rag_index.json");
    if (!res.ok) {
      throw new Error(`Failed to load rag_index.json (${res.status})`);
    }
    return (await res.json()) as RagIndex;
  } catch (e) {
    console.error("Failed to load RAG index:", e);
    return { chunks: [] };
  }
}

async function callWorkersAI(env: Env, prompt: string): Promise<string> {
  const accountId = env.CF_ACCOUNT_ID;
  const apiToken = env.CF_API_TOKEN;
  const model = env.CF_AI_MODEL || "@cf/meta/llama-3.1-8b-instruct";

  if (!accountId || !apiToken) {
    throw new Error("Missing Cloudflare AI credentials");
  }

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Workers AI error ${resp.status}: ${txt}`);
  }

  const data: any = await resp.json();
  return data?.result?.response ?? data?.response ?? "";
}

export async function onRequest(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;

  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // Only handle POST
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  try {
    const body = (await request.json()) as ChatRequest;
    const q = normalizeQuery(body.message);

    if (!q) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const index = await loadIndex(env);
    const siteUrl = String(env.PUBLIC_SITE_URL || "http://localhost:8080");
    const supaAll = await fetchSupabaseProducts(env);
    const supaActive = supaAll.filter((p) => isActiveProductStatus(p?.status));

    const dynamicChunks: RagChunk[] = [];

    if (supaActive.length > 0) {
      const sortedByPrice = [...supaActive]
        .filter((p) => typeof p.price === "number")
        .sort((a, b) => Number(b.price) - Number(a.price));
      const mostExpensive = sortedByPrice[0];
      if (mostExpensive) {
        dynamicChunks.push({
          title: "Pricing Summary - Most Expensive Product",
          url: `${siteUrl.replace(/\/$/, "")}/shop`,
          content: `The most expensive active product is "${mostExpensive.name}" (${mostExpensive.group_name || ""}) at $${Number(mostExpensive.price).toFixed(2)}.`,
          embedding: [],
        });
      }

      const bundles = supaActive.filter((p) => String(p.category || "").toLowerCase() === "bundles");
      if (bundles.length) {
        const lines = bundles
          .slice(0, 20)
          .map((b) => `- ${b.name} ($${Number(b.price).toFixed(2)})${b.description ? `: ${b.description}` : ""}`)
          .join("\n");
        dynamicChunks.push({
          title: "Bundles - Current Active Bundles",
          url: `${siteUrl.replace(/\/$/, "")}/shop/bundles`,
          content: `Active bundles:\n${lines}`,
          embedding: [],
        });
      }

      for (const p of supaActive.slice(0, 80)) {
        const group = p.group_name || p.name;
        const slug = String(group || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
        const productUrl = `${siteUrl.replace(/\/$/, "")}/product/${slug}?sku=${encodeURIComponent(p.sku || "")}`;
        const content = [
          `Name: ${p.name}`,
          p.group_name ? `Group: ${p.group_name}` : "",
          p.sku ? `SKU: ${p.sku}` : "",
          p.category ? `Category: ${p.category}` : "",
          p.price != null ? `Price: $${Number(p.price).toFixed(2)}` : "",
          p.description ? `Description: ${p.description}` : "",
        ].filter(Boolean).join("\n");

        dynamicChunks.push({
          title: `${group} - ${p.name}`,
          url: productUrl,
          content,
          embedding: [],
        });
      }
    }

    const allChunks = [...dynamicChunks, ...index.chunks];

    const scored = allChunks
      .map((c) => ({
        c,
        score: keywordFallbackScore(q, `${c.title}\n${c.content}`),
      }))
      .sort((a, b) => b.score - a.score);

    const top = scored.slice(0, 7).map((x) => x.c);

    const context = top
      .map((c) => `Title: ${c.title}\nURL: ${c.url}\n\n${c.content}`)
      .join("\n\n---\n\n")
      .slice(0, 3500);

    if (!context.trim()) {
      return new Response(
        JSON.stringify({
          response: "I couldn't find relevant information about that. Try asking about our products, team, shipping, or contact info!",
          sources: [],
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const prompt =
      "You are Thrive Wellness's helpful AI assistant. " +
      "Answer the user's question using ONLY the context below. " +
      "For product prices, use the exact prices from the context. " +
      "Be concise, friendly, and conversational - give direct answers without repeating the entire context. " +
      "If the answer isn't in the context, say you don't know.\n\n" +
      `Context:\n${context}\n\n` +
      `User question: ${q}\n\n` +
      "Answer (be direct and natural):";

    let responseText = "";
    try {
      responseText = await callWorkersAI(env, prompt);
    } catch (e) {
      console.error("AI error:", e);
      // Fallback to context-based response
      responseText = `Based on our website information:\n\n${context.slice(0, 500)}`;
    }

    const sources = top.slice(0, 3).map((c) => ({ content: c.content.slice(0, 200), url: c.url }));

    return new Response(JSON.stringify({ response: responseText, sources }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: any) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Internal server error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
