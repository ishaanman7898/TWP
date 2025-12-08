const express = require("express");
const cors = require("cors");
const path = require("path");
const { WebSocketServer } = require("ws");
const { v4: uuidv4 } = require("uuid");

const HTTP_PORT = process.env.PORT || 8080;
const WS_PORT = process.env.WSPORT || 8081;

// Active browser sessions: { sessionId: WebSocket }
const sessions = {};

// WebSocket signaling/control server
const wss = new WebSocketServer({ port: WS_PORT, host: "0.0.0.0" });
wss.on("connection", (ws) => {
  ws.id = uuidv4();
  console.log("WS client connected:", ws.id);

  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);
      if (data.type === "register" && data.sessionId) {
        sessions[data.sessionId] = ws;
        ws.sessionId = data.sessionId;
        console.log("Browser registered:", data.sessionId);
      }
    } catch (e) {
      console.warn("Invalid WS message:", e.message);
    }
  });

  ws.on("close", () => {
    if (ws.sessionId && sessions[ws.sessionId] === ws) {
      delete sessions[ws.sessionId];
      console.log("Browser disconnected:", ws.sessionId);
    }
  });
});
console.log(`WS server listening on ws://0.0.0.0:${WS_PORT}`);

// HTTP API
const app = express();
app.use(cors());
app.use(express.json());

// Optional: serve the client for convenience
app.use(express.static(path.resolve(__dirname, "..", "client")));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/sessions", (_req, res) => {
  res.json({ sessions: Object.keys(sessions) });
});

// Send cart sequence to a specific browser session
app.post("/sendCart", (req, res) => {
  const { sessionId, links } = req.body || {};
  if (!sessionId || !Array.isArray(links) || links.length === 0) {
    return res.status(400).json({ error: "sessionId and non-empty links[] required" });
  }
  const ws = sessions[sessionId];
  if (!ws || ws.readyState !== 1) {
    return res.status(400).json({ error: "Invalid or offline session" });
  }
  ws.send(
    JSON.stringify({ type: "runCartSequence", links })
  );
  res.json({ ok: true, sent: links.length });
});

app.listen(HTTP_PORT, "0.0.0.0", () => {
  console.log(`HTTP server listening on http://0.0.0.0:${HTTP_PORT}`);
});
