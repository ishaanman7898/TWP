# Migrate from Vercel to Cloudflare Pages

## Why Cloudflare Pages?

### Vercel Limits (Hobby Plan):
- ❌ 100 GB bandwidth/month
- ❌ Can get expensive quickly with video/images
- ❌ Limited to 100 deployments/day

### Cloudflare Pages Benefits:
- ✅ **UNLIMITED bandwidth** (no caps!)
- ✅ **UNLIMITED requests**
- ✅ **500 builds/month** (Free plan)
- ✅ Built-in CDN (faster global delivery)
- ✅ Free SSL certificates
- ✅ Better DDoS protection
- ✅ Faster build times

**Bottom line:** Cloudflare Pages is better for bandwidth-heavy sites like yours!

---

## Migration Steps

### Step 1: Prepare Your Project

Your project is already compatible! Cloudflare Pages supports:
- ✅ Vite (your build tool)
- ✅ React
- ✅ Environment variables
- ✅ Custom domains

**No code changes needed!**

### Step 2: Create Cloudflare Account

1. Go to https://dash.cloudflare.com/sign-up
2. Sign up with email (free account)
3. Verify your email

### Step 3: Connect GitHub Repository

1. Go to **Workers & Pages** in Cloudflare Dashboard
2. Click **Create application**
3. Click **Pages** tab
4. Click **Connect to Git**
5. Authorize Cloudflare to access your GitHub
6. Select your repository: `ishaanman7898/TWP`

### Step 4: Configure Build Settings

**Framework preset:** Vite

**Build command:**
```bash
npm run build
```

**Build output directory:**
```
dist
```

**Root directory:** (leave empty)

**Node version:** 18

**IMPORTANT:** In **Environment variables** section, add this:
```
SKIP_DEPENDENCY_INSTALL = python
```

This tells Cloudflare to skip Python dependency installation (the `.py` files are just local helper scripts, not needed for deployment).

### Step 5: Add Environment Variables

Click **Environment variables** and add:

```
VITE_SUPABASE_URL = https://quygevwkhlggdifdqqto.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1eWdldndraGxnZ2RpZmRxcXRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4NDU5MjUsImV4cCI6MjA4MTQyMTkyNX0.dJybVffyolKTz0hNL4yVviEZ8KJ8iwdODt3I3Gp3ivg
VITE_ADMIN_EMAIL = thrivewellness.il@veinternational.org
```

**Important:** Add these for both **Production** and **Preview** environments!

### Step 6: Deploy

1. Click **Save and Deploy**
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://twp-xxx.pages.dev`

### Step 7: Add Custom Domain

1. In Cloudflare Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter: `thrive-ve.com` or `www.thrive-ve.com`
4. Follow DNS instructions to point your domain to Cloudflare

**If your domain is already on Cloudflare DNS:**
- It will automatically configure! ✅

**If your domain is elsewhere:**
- You'll need to update DNS records (Cloudflare provides instructions)

### Step 8: Configure Redirects (Optional)

Create a `public/_redirects` file for SPA routing:

```
/*    /index.html   200
```

This ensures React Router works correctly.

### Step 9: Test Your Site

1. Visit your Cloudflare Pages URL
2. Test all pages work
3. Check Supabase connection works
4. Verify images/videos load from Supabase

### Step 10: Update DNS (Final Step)

Once everything works on Cloudflare:

1. Go to your domain registrar (where you bought thrive-ve.com)
2. Update nameservers to Cloudflare's (if not already)
3. Or update A/CNAME records to point to Cloudflare Pages

**Cloudflare will provide exact DNS records to add**

---

## Comparison: Vercel vs Cloudflare Pages

| Feature | Vercel (Hobby) | Cloudflare Pages (Free) |
|---------|----------------|-------------------------|
| Bandwidth | 100 GB/month | **UNLIMITED** ✅ |
| Requests | Unlimited | **UNLIMITED** ✅ |
| Build minutes | 6,000/month | 500 builds/month |
| Deployments | 100/day | Unlimited |
| CDN | Yes | **Yes (faster)** ✅ |
| SSL | Yes | Yes |
| Custom domains | Yes | Yes |
| Edge functions | Yes (limited) | Yes (Workers) |

**Winner:** Cloudflare Pages for bandwidth-heavy sites! 🏆

---

## What Happens to Vercel?

**Option 1: Keep Both (Recommended for testing)**
- Keep Vercel as backup
- Test Cloudflare Pages first
- Switch DNS when ready

**Option 2: Delete Vercel Project**
- Once Cloudflare works perfectly
- Delete Vercel project to avoid confusion
- Keep GitHub repo (it's the source of truth)

---

## Troubleshooting

### Build fails on Cloudflare
**Solution:** Check build logs, ensure Node version is 18+

### Environment variables not working
**Solution:** Make sure you added them for BOTH Production and Preview

### 404 errors on routes
**Solution:** Add `public/_redirects` file with SPA redirect rule

### Images not loading
**Solution:** They're already on Supabase, should work fine!

---

## Cost Comparison (Monthly)

### Current Setup (Vercel):
- Vercel Hobby: **$0** (but limited to 100GB)
- If you exceed: **$20/month** for Pro plan
- Supabase Free: **$0** (5GB bandwidth)

### With Cloudflare Pages:
- Cloudflare Pages: **$0** (unlimited bandwidth!)
- Supabase Free: **$0** (5GB bandwidth)
- **Total: $0/month** with no bandwidth worries! 🎉

---

## Next Steps

1. Create Cloudflare account
2. Connect GitHub repo
3. Configure build settings
4. Add environment variables
5. Deploy and test
6. Switch DNS when ready

**Estimated time:** 15-20 minutes

Want me to help you with any specific step?
