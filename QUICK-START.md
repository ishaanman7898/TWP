# Quick Start Guide

## Development

```bash
npm run dev
```
Opens at http://localhost:8080

## Add Training Documents

1. Add files to `training-docs/` folder (.txt, .md, .json)
2. Run `npm run dev` - automatically rebuilds knowledge base
3. Chatbot now knows your content!

## Deploy to Cloudflare Pages

### First Time Setup

1. Push to GitHub:
```bash
git add .
git commit -m "Deploy"
git push
```

2. Cloudflare Dashboard:
   - Workers & Pages → Create application
   - Choose "Pages" → Connect to Git
   - Select your repo

3. Build Settings:
   - Build command: `npm run build`
   - Build output: `dist`

4. Environment Variables (Settings → Environment variables):
```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
CF_ACCOUNT_ID=your_account_id
CF_API_TOKEN=your_token
CF_AI_MODEL=@cf/meta/llama-3.2-1b-instruct
PUBLIC_SITE_URL=https://your-site.pages.dev
```

5. Save and Deploy!

### Updates

Just push to GitHub - auto-deploys!

```bash
git add .
git commit -m "Update"
git push
```

## Chatbot Features

### Landing Page
- Shows when scrolled past video (80% viewport)
- Hides when scrolling back up to video

### Other Pages
- Shows after scrolling 100px
- Stays visible

### Company/Support Pages
- Always visible

### Speed
- 5-10 second responses (using fast AI model)
- Cached Supabase data (5 min cache)
- Pre-built knowledge base

## Training Documents

Supported formats:
- `.txt` - Plain text
- `.md` - Markdown
- `.json` - JSON

Example:
```
training-docs/
  ├── policy.txt
  ├── specs.md
  └── data.json
```

Run `npm run dev` and chatbot learns automatically!

## Troubleshooting

### Chatbot not responding?
- Check browser console
- Verify `/api/chat` endpoint
- Check Cloudflare logs

### Training docs not loading?
- Check file extensions
- Run `npm run build:knowledge` to test
- Check console output

### Build fails?
- Check Cloudflare build logs
- Verify environment variables
- Ensure Node.js 18+

## Support

Email: thrivewellness.il@veinternational.org
