# Asset Migration to Supabase Guide

## Overview
This guide will help you move all website assets (videos, images) from Vercel to Supabase Storage to reduce bandwidth usage.

## What Gets Moved:
- ✅ HeroVideo.mp4 (6.21 MB) - BIGGEST SAVINGS
- ✅ favicon.png → favicon.jpg (compressed)
- ✅ Thrive.png → Thrive.jpg (compressed)
- ✅ ThriveSocial.png → ThriveSocial.jpg (compressed)
- ✅ placeholder.svg
- ❌ Team images (already handled separately)
- ❌ Product images (already in Supabase)

## Prerequisites

1. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

2. **Create Supabase Storage Bucket:**
   - Go to Supabase Dashboard → Storage
   - Click "Create a new bucket"
   - Name: `WebsiteLink`
   - Make it **Public** (check the box)
   - Click "Create bucket"

## Step-by-Step Instructions

### Step 1: Upload Assets to Supabase
```bash
python upload_assets_to_supabase.py
```

**What this does:**
- Compresses PNG images to JPG (50-70% smaller)
- Uploads all assets to Supabase `WebsiteLink` bucket
- Prints public URLs for each file

**Expected output:**
```
✓ Compressed: favicon.jpg (0.05 MB, saved 45%)
✓ Uploaded successfully!
🔗 Public URL: https://...supabase.co/storage/v1/object/public/WebsiteLink/favicon.jpg
```

### Step 2: Update Code to Use Supabase URLs
```bash
python update_asset_urls.py
```

**What this does:**
- Updates `src/components/Hero.tsx` (HeroVideo)
- Updates `src/components/Footer.tsx` (logos)
- Updates `index.html` (favicon, social images)

### Step 3: Test Locally
```bash
npm run dev
```

**Check that:**
- ✅ Hero video plays on homepage
- ✅ Favicon shows in browser tab
- ✅ Footer logos display correctly
- ✅ Social preview images work (test with link preview tools)

### Step 4: Commit and Deploy
```bash
git add -A
git commit -m "Move assets to Supabase Storage to reduce Vercel bandwidth"
git push origin master
```

### Step 5: Clean Up (Optional)
After confirming everything works on production:

```bash
# Delete local files to save space
rm public/HeroVideo.mp4
rm public/favicon.png
rm public/Thrive.png
rm ThriveSocial.png
rm VE.png
```

## Bandwidth Savings

### Before:
- HeroVideo.mp4: 6.21 MB × 10,000 visits = **62.1 GB/month**
- Images: 0.3 MB × 10,000 visits = **3 GB/month**
- **Total: ~65 GB/month from Vercel**

### After:
- HeroVideo.mp4: Served from Supabase ✅
- Images: Served from Supabase ✅
- **Total: ~5 GB/month from Vercel** (JS/CSS only)

**Savings: 90% reduction in Vercel bandwidth!** 🎉

## Troubleshooting

### Issue: "Bucket not found"
**Solution:** Create the `WebsiteLink` bucket manually in Supabase Dashboard

### Issue: "Permission denied"
**Solution:** Make sure you're using `SUPABASE_SERVICE_ROLE_KEY` in .env (not anon key)

### Issue: Images not loading
**Solution:** 
1. Check bucket is set to **Public**
2. Verify URLs in browser console
3. Check Supabase Storage policies

### Issue: Video not playing
**Solution:**
1. Check video URL in browser directly
2. Verify CORS settings in Supabase
3. Check browser console for errors

## Supabase Storage Limits (Free Plan)

- **Storage:** 1 GB (you'll use ~10 MB)
- **Bandwidth:** 5 GB/month (plenty for your traffic)
- **File uploads:** Unlimited

You're well within limits! ✅

## Need Help?

If you run into issues:
1. Check the console output for error messages
2. Verify bucket exists and is public
3. Check .env file has correct Supabase credentials
4. Test URLs directly in browser
