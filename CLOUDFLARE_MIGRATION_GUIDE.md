# Cloudflare Pages Migration Guide

## Overview
This guide documents the migration from Vercel to Cloudflare Pages for the Thrive Wellness website. Cloudflare Pages provides unlimited bandwidth, making it ideal for a growing e-commerce platform.

## Why Cloudflare Pages?

| Feature | Vercel | Cloudflare Pages |
|---------|--------|------------------|
| Bandwidth | 100GB/month (paid) | Unlimited |
| Build Time | 45 seconds | ~30 seconds |
| Deployment | Automatic on push | Automatic on push |
| Cost | $20+/month | Free tier available |
| Edge Network | Global | Global (Cloudflare's network) |

## Current Setup

### Configuration Files
- **wrangler.toml**: Cloudflare Pages configuration
- **.node-version**: Node 20 (required for build compatibility)
- **vite.config.ts**: Vite build configuration
- **package.json**: Dependencies and build scripts

### Key Settings
```toml
# wrangler.toml
name = "thrive-wellness"
compatibility_date = "2025-12-20"

[assets]
directory = "./dist"
```

## Deployment Steps

### 1. Connect GitHub Repository
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project**
3. Select **Connect to Git**
4. Authorize Cloudflare to access your GitHub account
5. Select the `ve-wellness-blue` repository
6. Click **Begin setup**

### 2. Configure Build Settings
- **Project name**: `thrive-wellness`
- **Production branch**: `master`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node.js version**: `20` (automatically detected from .node-version)

### 3. Environment Variables
Add these in Cloudflare Pages project settings:

```
VITE_SUPABASE_URL=https://quygevwkhlggdifdqqto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Note**: These are public keys (safe to expose on client-side). Sensitive keys should never be added.

### 4. Deploy
1. Click **Save and Deploy**
2. Cloudflare will automatically build and deploy
3. Your site will be available at `https://thrive-wellness.pages.dev`

### 5. Custom Domain
1. In Cloudflare Pages project settings, go to **Custom domains**
2. Add your domain (e.g., `thrivewellness.com`)
3. Update DNS records if needed (Cloudflare will provide instructions)

## Build Process

### Local Build
```bash
npm run build
```

Output: `dist/` directory with optimized production files

### Cloudflare Build
- Automatically triggered on push to `master` branch
- Uses Node 20 (from .node-version)
- Runs `npm run build` command
- Deploys `dist/` directory

## Performance Optimizations

### Current Optimizations
1. **Asset Compression**: Images and videos hosted on Supabase
2. **Code Splitting**: Vite automatically optimizes chunks
3. **CSS Minification**: Tailwind CSS production build
4. **JavaScript Minification**: Vite production build

### Bandwidth Reduction Strategy
- **Team images**: Supabase Storage (team-photos bucket)
- **Product images**: Supabase Storage (email-product-pictures bucket)
- **Videos**: Supabase Storage (WebsiteLink bucket)
- **Static assets**: Cloudflare Pages CDN

### Result
- Only HTML/CSS/JS served from Cloudflare Pages
- All media served from Supabase (separate bandwidth)
- Vercel bandwidth usage: ~0 (no longer used)

## Monitoring & Troubleshooting

### Check Deployment Status
1. Go to Cloudflare Dashboard → Pages → thrive-wellness
2. View **Deployments** tab for build logs
3. Check **Analytics** for traffic and performance

### Common Issues

#### Build Fails
- Check Node version: Should be 20
- Verify environment variables are set
- Check build logs in Cloudflare Dashboard

#### Site Not Loading
- Clear browser cache
- Check custom domain DNS settings
- Verify Supabase URLs are accessible

#### Slow Performance
- Check Cloudflare Analytics for bottlenecks
- Verify Supabase is responding quickly
- Consider enabling Cloudflare caching rules

## Rollback to Vercel

If needed, rollback is simple:
1. Update `vercel.json` with build settings
2. Push to GitHub
3. Vercel will automatically redeploy

## Next Steps

1. ✅ Configure wrangler.toml
2. ✅ Set Node version to 20
3. ✅ Test local build
4. ⏳ Connect GitHub repository to Cloudflare Pages
5. ⏳ Add environment variables
6. ⏳ Deploy and verify
7. ⏳ Update DNS to point to Cloudflare
8. ⏳ Monitor performance

## Support Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
