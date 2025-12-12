// Store checkout sessions (in production, use Redis or database)
const checkoutSessions = new Map();

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId } = req.query;
    const session = checkoutSessions.get(sessionId as string);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    return res.json(session);
  } catch (error) {
    console.error("Status check error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
