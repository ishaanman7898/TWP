// server.js (ESM)
import express from "express";
import { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// In-memory store of sessions
const sessions = new Map();

// Serve frontend
app.use("/client", express.static(path.join(__dirname, "client")));

// Health check endpoint
app.get("/health", (req, res) => res.json({ status: "ok", timestamp: new Date() }));

// HTTP server for WebSocket
const wsPort = 8081;
const wsServer = http.createServer();
const wss = new WebSocketServer({ server: wsServer });

wss.on("connection", (ws) => {
  const sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
  sessions.set(sessionId, ws);

  ws.send(JSON.stringify({ type: "sessionId", sessionId }));
  console.log("New client connected, session:", sessionId);

  ws.on("close", () => {
    sessions.delete(sessionId);
    console.log("Client disconnected, session:", sessionId);
  });
});

// Start WebSocket server
wsServer.listen(wsPort, "0.0.0.0", () => {
  console.log(`WebSocket server running on ws://0.0.0.0:${wsPort}`);
});

// Endpoint to send cart links to a session
app.post("/sendCart", (req, res) => {
  const { sessionId, links } = req.body;
  const ws = sessions.get(sessionId);

  if (!ws) return res.status(404).json({ error: "Session not found" });
  if (!Array.isArray(links) || !links.length) return res.status(400).json({ error: "No links provided" });

  ws.send(JSON.stringify({ type: "cartLinks", links }));
  res.json({ ok: true });
  console.log(`Sent ${links.length} links to session ${sessionId}`);
});

// Start Express server
const PORT = 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`HTTP server running on http://0.0.0.0:${PORT}`);
});
