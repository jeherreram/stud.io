# Setup Guide - Telc B1 Email Practice Application

## Step 1: Install Node.js and Dependencies

If you haven't already, install Node.js (v18 or higher):
- Download from https://nodejs.org/
- Or use Homebrew: `brew install node`

Then install project dependencies:
```bash
npm install
```

## Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for your project to be ready (this takes a few minutes)
4. Go to **Project Settings** → **API**
5. Copy these values (you'll need them later):
   - Project URL
   - anon/public key
   - service_role key

## Step 3: Create Database Tables

In your Supabase dashboard:

1. Click on **SQL Editor** in the left sidebar
2. Click **New Query**
3. Copy the contents of `supabase/migrations/001_initial_schema.sql`
4. Paste it into the SQL editor
5. Click **Run** to execute the migration

This creates all necessary tables with proper security policies.

## Step 4: Seed Sample Email Prompts

1. Still in SQL Editor, click **New Query** again
2. Copy the contents of `supabase/seed-prompts.sql`
3. Paste and run it
4. Verify by checking the `email_prompts` table - you should have 12 sample prompts

## Step 5: Set Up Anthropic Claude API

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Navigate to **Account** → **API Keys** (or **Settings** → **API Keys**)
4. Click **Create Key**
5. Give it a name and copy the key (you can't see it again!)

## Step 6: Configure Environment Variables

1. Copy the template file:
   ```bash
   cp env-template .env.local
   ```

2. Open `.env.local` and fill in your credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
ANTHROPIC_API_KEY=sk-ant-...
```

## Step 7: Run the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 8: Test the Application

1. Click **Sign Up** on the homepage
2. Create an account with your email
3. Verify your email (check your inbox for the Supabase confirmation email)
4. Login and you'll see the dashboard
5. Click **Start Practice** to write your first email
6. Submit your response and see the AI evaluation!

## Troubleshooting

### "Module not found" errors
Run `npm install` to ensure all dependencies are installed.

### "Unauthorized" errors
Check that your environment variables in `.env.local` are correct, especially the Supabase keys.

### Database connection errors
- Verify your Supabase project is active
- Check that you ran the SQL migration files
- Make sure your Project URL and keys are correct in `.env.local`

### API evaluation fails
- Check your Anthropic API key is valid
- Make sure you have API credits available
- Check the browser console and server logs for specific error messages

## Next Steps

Once everything is working:

1. **Test the complete flow**: Register → Practice → Evaluate → View Progress
2. **Add more email prompts**: You can add more prompts via the Supabase dashboard
3. **Deploy to Vercel**: See deployment instructions below

## Deployment to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **Add New Project**
4. Import your GitHub repository
5. Add environment variables in Vercel settings:
   - Add all variables from your `.env.local`
6. Click **Deploy**
7. Your app will be live in minutes!

## File Structure Overview

```
/app
  /api              # API routes (evaluation, progress, etc.)
  /auth            # Login and registration pages
  /dashboard       # Main dashboard
  /practice        # Email writing practice interface
  /progress        # Progress tracking and charts
  layout.tsx       # Root layout
  page.tsx         # Landing page

/components/ui    # shadcn/ui components

/lib
  evaluation-service.ts  # Claude API integration
  supabase.ts           # Supabase client

/types            # TypeScript type definitions

/supabase
  migrations/     # Database schema SQL
  seed-prompts.sql # Sample email prompts
```

## Key Features Implemented

✅ User authentication (registration/login)
✅ Email prompt display with German characters
✅ Text editor with word count (150 word limit)
✅ AI-powered evaluation using Claude API
✅ Official Telc B1 grading criteria (I, II, III)
✅ Automatic pass/fail determination
✅ Weakness tracking by 8 categories
✅ Progress analytics with charts
✅ Mobile-responsive design

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check the terminal where `npm run dev` is running
3. Verify all environment variables are set
4. Ensure database tables are created properly
5. Test API keys directly in respective dashboards

Happy coding! 🚀

