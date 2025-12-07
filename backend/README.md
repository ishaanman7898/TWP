# Thrive Backend (Render/Docker)

This is the server-side checkout handler for Thrive. It launches Chromium via Puppeteer to automate adding items to the official VEI cart.

## Docker/Render deployment

1. Build and run locally:
   ```bash
   npm install
   node server.js
   ```
   or use Docker:
   ```bash
   docker build -t ve-backend .
   docker run --rm -p 3000:3000 --shm-size=1gb ve-backend
   ```

2. Deploy to Render:
   - New Web Service, root is `backend/`
   - No build command (Dockerfile is detected)
   - Exposed port: 3000
   - Set env var if needed: `CHROMIUM_PATH` (try `/usr/bin/chromium` or `/usr/bin/chromium-browser`)

3. Your frontend should call the URL Render provides for this service.

**Endpoints:**
- `POST /checkout` (body: `{ items: [ { name, url }, ... ]}`)
- `GET /health`

**For full documentation and frontend setup, see the main repo's README.**
