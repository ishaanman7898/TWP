import express from "express";
import cors from "cors";
import puppeteer from "puppeteer-core";

const app = express();
app.use(express.json());
app.use(cors());

const FINAL_CART = "https://portal.veinternational.org/buybuttons/us019814/cart/";
// Try /usr/bin/chromium or /usr/bin/chromium-browser in Docker
const CHROMIUM_PATH = process.env.CHROMIUM_PATH || "/usr/bin/chromium-browser";

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/checkout", async (req, res) => {
  const items = Array.isArray(req.body.items) ? req.body.items : [];
  if (!items.length) return res.status(400).json({ error: "No items provided" });

  res.json({ ok: true, message: `Processing ${items.length} items` });
  console.log("Starting checkout for", items.length, "items");

  try {
    const browser = await puppeteer.launch({
      executablePath: CHROMIUM_PATH,
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-extensions",
        "--disable-background-networking",
        "--disable-default-apps",
        "--disable-sync",
        "--disable-translate",
        "--disable-infobars",
        "--disable-blink-features=AutomationControlled",
        "--no-first-run",
        "--no-default-browser-check",
        `--user-data-dir=/tmp/puppeteer_user_data`
      ],
      ignoreDefaultArgs: ["--enable-automation"]
    });

    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/115.0 Safari/537.36");

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      console.log(`[${i+1}/${items.length}] Visiting ${item.name} -> ${item.url}`);
      try {
        await page.goto(item.url, { waitUntil: "networkidle2", timeout: 30000 });
        await page.waitForTimeout(400);
      } catch (err) {
        console.warn("Failed loading", item.url, err.message);
      }
    }
    console.log("Navigating to final cart");
    await page.goto(FINAL_CART, { waitUntil: "networkidle2", timeout: 30000 });
    await page.waitForTimeout(800);
    await browser.close();
    console.log("Checkout complete.");
  } catch (err) {
    console.error("Puppeteer run error:", err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend listening on ${PORT}`));
