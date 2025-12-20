# Vercel Bandwidth Optimization Plan

## Current Situation Analysis

### What's Using Vercel Bandwidth (Outgoing Traffic):
1. **HeroVideo.mp4** - 6.21 MB (BIGGEST CULPRIT)
   - Loaded on every homepage visit
   - If 1000 visitors = 6.21 GB bandwidth
   - If 10,000 visitors = 62.1 GB bandwidth

2. **Team Images** - 1.8 MB total (20 images @ ~90KB each)
   - Only loaded on Team page
   - Less traffic than homepage

3. **JavaScript/CSS bundles** - ~500KB-1MB (estimated)
   - Loaded on every page visit
   - Cached by browser after first load

4. **Other assets** - favicon, logos (~180KB total)
   - Minimal impact

### Estimated Monthly Traffic:
- Homepage visits: Most traffic (everyone lands here)
- HeroVideo alone could consume 50-80% of your bandwidth

---

## SOLUTION PLAN (Ranked by Impact)

### 🔴 PRIORITY 1: Move HeroVideo to External CDN (SAVES 60-80% BANDWIDTH)

**Problem:** 6.21 MB video served from Vercel on every homepage visit

**Solutions (Pick One):**

#### Option A: Upload to Supabase Storage (RECOMMENDED)
- Upload HeroVideo.mp4 to Supabase Storage bucket
- Update Hero.tsx to use Supabase URL
- **Pros:** Free, already using Supabase, easy setup
- **Cons:** Uses Supabase bandwidth (but you have more there)

#### Option B: Use YouTube/Vimeo Embed
- Upload video to YouTube/Vimeo
- Embed using iframe or player
- **Pros:** Completely free, unlimited bandwidth
- **Cons:** Shows YouTube/Vimeo branding, less control

#### Option C: Use Cloudflare R2 or Bunny CDN
- Upload to dedicated video CDN
- **Pros:** Optimized for video delivery, cheap
- **Cons:** Requires new account, small monthly cost

**RECOMMENDATION:** Option A (Supabase Storage)

---

### 🟡 PRIORITY 2: Move Team Images Back to Supabase (SAVES 10-15% BANDWIDTH)

**Problem:** 1.8 MB of team images served from Vercel

**Solution:**
- We already have them in Supabase (you just had those 2 broken images)
- Fix the 2 broken images in Supabase
- Revert Team.tsx to use Supabase URLs
- Delete local `/public/team/` folder

**Impact:** Moderate - only affects Team page visitors

---

### 🟢 PRIORITY 3: Enable Aggressive Caching Headers (SAVES 20-30% BANDWIDTH)

**Problem:** Assets re-downloaded on every visit

**Solution:** Add caching headers in `vercel.json`

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*\\.(jpg|jpeg|png|gif|svg|ico))",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=86400"
        }
      ]
    }
  ]
}
```

**Impact:** Reduces repeat visitor bandwidth by 70-80%

---

### 🟢 PRIORITY 4: Optimize Remaining Images (SAVES 5-10% BANDWIDTH)

**Current Images:**
- favicon.png: 90KB
- Thrive.png: 90KB

**Solution:**
- Convert to WebP format (50-70% smaller)
- Or move to Supabase Storage

---

## IMPLEMENTATION PLAN

### Phase 1: Quick Wins (Do This Now) ⚡
1. Move HeroVideo.mp4 to Supabase Storage
2. Update Hero.tsx to use Supabase URL
3. Add caching headers to vercel.json

**Expected Savings:** 70-80% bandwidth reduction

### Phase 2: Complete Optimization (Do This Week) 📅
1. Fix 2 broken team images in Supabase
2. Move team images back to Supabase
3. Delete local `/public/team/` folder
4. Optimize favicon and logos to WebP

**Expected Savings:** 85-90% bandwidth reduction

### Phase 3: Monitoring (Ongoing) 📊
1. Check Vercel analytics weekly
2. Monitor Supabase bandwidth usage
3. Adjust caching strategies as needed

---

## ESTIMATED BANDWIDTH AFTER OPTIMIZATION

### Before:
- 10,000 homepage visits = ~62 GB (video alone)
- 1,000 team page visits = ~1.8 GB (team images)
- Total: ~65-70 GB/month

### After Phase 1:
- 10,000 homepage visits = ~5 GB (JS/CSS only, video from Supabase)
- 1,000 team page visits = ~1.8 GB (team images)
- Total: ~8-10 GB/month ✅

### After Phase 2:
- 10,000 homepage visits = ~5 GB
- 1,000 team page visits = ~0.5 GB (JS/CSS only, images from Supabase)
- Total: ~6-8 GB/month ✅✅

**Result:** Stay well under 100GB limit even with 50,000+ monthly visitors!

---

## NEXT STEPS

Want me to implement Phase 1 right now? I can:
1. Create a Supabase Storage bucket for the hero video
2. Upload HeroVideo.mp4 to Supabase
3. Update Hero.tsx to use the Supabase URL
4. Add caching headers to vercel.json

This will immediately save 60-80% of your Vercel bandwidth.
