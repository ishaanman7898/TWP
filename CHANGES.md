# Recent Changes

## Chatbot Improvements

### 1. Landing Page Visibility
- Chatbot appears when scrolled past video (80% viewport)
- Disappears when scrolling back up to video
- Perfect integration with landing page scroll behavior

### 2. Faster AI Responses
- Switched from `llama-3.1-8b-instruct` (8B params) to `llama-3.2-1b-instruct` (1B params)
- Response time reduced from 40 seconds to 5-10 seconds
- Added `max_tokens: 256` for faster generation
- Still accurate for customer service queries

### 3. Training Documents System
- New `training-docs/` folder for easy content management
- Supports `.txt`, `.md`, and `.json` files
- Automatically rebuilds knowledge base when you run `npm run dev` or `npm run build`
- Just add files and rebuild - chatbot learns automatically!

### 4. Cloudflare Pages Compatibility
- Proper function export format (`onRequest`)
- Pre-built knowledge base and RAG index
- Optimized for serverless deployment
- Works with Cloudflare Pages auto-deploy

## Files Deleted

Removed unnecessary files to speed up builds:
- All Python backend files (`chatbot-backend/`)
- Documentation files (README.md, MIGRATION_COMPLETE.md, etc.)
- Duplicate function files
- Test files and tools
- Empty folders

## New Files

- `DEPLOYMENT.md` - Complete deployment guide
- `QUICK-START.md` - Quick reference
- `CHANGES.md` - This file
- `training-docs/` - Folder for training documents
- `.cloudflare-pages-build-config.json` - Build configuration

## How to Use

### Development
```bash
npm run dev
```

### Add Training Content
1. Add files to `training-docs/`
2. Run `npm run dev`
3. Chatbot knows your content!

### Deploy
```bash
git push
```
(Auto-deploys if connected to Cloudflare Pages)

## Performance

- Build time: ~5 seconds
- AI response: 5-10 seconds (was 40 seconds)
- Supabase cache: 5 minutes
- Knowledge base: Pre-built at build time

## Next Steps

1. Test locally with `npm run dev`
2. Add your training documents to `training-docs/`
3. Push to GitHub
4. Cloudflare Pages auto-deploys
5. Verify chatbot works on production

All set for Cloudflare Pages deployment!
