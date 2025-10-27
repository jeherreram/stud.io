# Telc B1 Email Writing Practice Application

A web application for practicing German email writing for Telc B1 certification with AI-powered evaluation.

## Features

- **Email Writing Practice**: Authentic Telc B1 email scenarios with German character support
- **AI Evaluation**: Instant feedback using official Telc B1 evaluation criteria
- **Progress Tracking**: Monitor improvement trends and identify weaknesses
- **Weakness Analysis**: Categorized feedback on 8 standardized weakness types

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth)
- **AI**: Anthropic Claude API
- **UI Components**: shadcn/ui
- **State**: Zustand
- **Forms**: React Hook Form + Zod

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Project Settings → API
3. Run the migration file `supabase/migrations/001_initial_schema.sql` in your Supabase SQL editor

### 3. Set Up Anthropic API

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Navigate to Settings → API Keys
4. Generate a new API key

### 4. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Update with your actual values:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ANTHROPIC_API_KEY=sk-ant-...
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Project Structure

```
/app               # Next.js app directory
  /api            # API routes
  /auth           # Authentication pages
  /dashboard      # Main dashboard
  /practice       # Email practice
  /progress       # Progress analytics
/components       # React components
/lib              # Utilities and services
/types            # TypeScript definitions
/supabase         # Database migrations
```

## Key Pages

- `/` - Landing page
- `/auth/login` - User login
- `/auth/register` - User registration
- `/dashboard` - Main dashboard
- `/practice` - Email writing practice
- `/progress` - Progress tracking and analytics

## Database Schema

- `profiles` - User profiles
- `email_prompts` - Email scenarios
- `user_responses` - Student submissions
- `evaluations` - AI grading results
- `user_weaknesses` - Tracked weaknesses
- `progress_stats` - Performance metrics

## Environment Variables Required

You'll need to provide:
- **Supabase Project URL** - Get from Supabase dashboard
- **Supabase Anon Key** - Public key from Supabase
- **Supabase Service Role Key** - For admin operations
- **Anthropic API Key** - From Anthropic console

## Next Steps

1. Install Node.js and npm
2. Run `npm install` to install dependencies
3. Set up Supabase and Anthropic accounts
4. Configure environment variables
5. Run database migration
6. Start developing!

