# Deployment Instructions - Telc B1 App

## ✅ Build Fix Applied

Fixed the build error by renaming `eval` → `evaluation` in `app/api/progress/route.ts`

## 🚀 Deploy to Vercel

### Step 1: Import to Vercel

1. Go to https://vercel.com
2. Sign up or log in
3. Click **"Add New Project"**
4. Click **"Import Git Repository"**
5. Select your `jeherreram/stud.io` repository
6. Click **"Import"**

### Step 2: Configure Environment Variables

In Vercel project settings, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ANTHROPIC_API_KEY=your_anthropic_key
```

**To get these values:**
- Supabase: Go to your Supabase project → Settings → API
- Anthropic: Go to console.anthropic.com → Settings → API Keys

### Step 3: Deploy!

1. Click **"Deploy"** in Vercel
2. Wait for the build to complete (about 2-3 minutes)
3. Your app will be live at `https://stud-io.vercel.app` (or similar)

### Step 4: Verify Deployment

1. Visit your Vercel URL
2. Test the full flow:
   - Click "Sign Up"
   - Create an account
   - Log in
   - Click "Start Practice"
   - Write an email response
   - Submit for evaluation
   - View your results!

## 🎯 What's Deployed

- ✅ Next.js 14 with TypeScript
- ✅ Supabase authentication
- ✅ 12 German email prompts (80-150 words each)
- ✅ Claude AI evaluation
- ✅ Progress tracking with charts
- ✅ Weakness analysis
- ✅ Secure RLS policies
- ✅ Responsive design

## 📝 Post-Deployment Checklist

- [ ] Verify you can register/login
- [ ] Test email writing practice
- [ ] Confirm AI evaluation works
- [ ] Check progress dashboard loads
- [ ] Test on mobile device
- [ ] Monitor Vercel logs for errors

## 🐛 Troubleshooting

If deployment fails:

1. Check Vercel logs for build errors
2. Verify all environment variables are set correctly
3. Ensure Anthropic API key is valid and has credits
4. Check Supabase project is active and accessible

## 🎉 You're Live!

Your Telc B1 Email Practice app is now accessible to the world!

