# Technical Debt & Known Issues

## Auth & Security Issues

### 1. API Routes RLS Policy Bypass (HIGH PRIORITY)
**Status:** ✅ FIXED - Proper auth implemented  
**Impact:** Previously a security risk, now resolved

**Issue:**
- Supabase auth (`supabase.auth.getUser()`) doesn't work properly in API routes without proper session management
- Currently bypassing RLS by accepting `user_id` directly from client
- RLS policy relaxed to allow inserts: `WITH CHECK (true)`

**✅ FIXED Implementation:**
- Created `lib/server-supabase.ts` using @supabase/ssr with proper cookie handling
- All API routes now use `createClientSupabase()` for server-side auth
- RLS policies restored with proper `auth.uid()` checks
- Removed client-side `user_id` passing (security risk eliminated)

**Files Affected:**
- `app/api/responses/route.ts`
- `app/api/evaluate/route.ts`
- `lib/supabase.ts` (needs proper SSR implementation)
- `lib/supabase-client.ts`
- `lib/supabase-server.ts`

**Priority:** HIGH - Security issue that allows potential data access by unauthorized users

---

## Next Steps

1. Implement proper Supabase SSR auth with cookies
2. Use `@supabase/ssr` package correctly for both client and server
3. Restore strict RLS policies
4. Add middleware to validate auth on protected routes
5. Add API route authentication middleware

---

## Other Known Issues

### 2. Evaluation Service Error Handling
**Status:** Basic error handling implemented  
**Impact:** Medium - Users get generic errors instead of helpful messages

**Issue:**
- Claude API errors return generic messages
- No retry logic for failed evaluations
- No rate limiting awareness

**Fix:**
- Add specific error messages for different failure types
- Implement retry logic with exponential backoff
- Add rate limit checking and user-facing messages

### 3. Missing UI Components
**Status:** Partially implemented  
**Impact:** Low - Missing some niceties

**Issues:**
- No loading spinners for AI evaluation
- No toast notifications
- No error boundaries
- No offline support

**Fix:**
- Add React Hot Toast for notifications
- Add error boundaries
- Add skeleton loaders
- Consider offline-first approach

### 4. Progress Analytics Limitations
**Status:** Basic implementation  
**Impact:** Low - Analytics work but could be better

**Issues:**
- Charts show recent data only
- No export functionality
- No comparison with other users (anonymized)
- Limited filtering options

**Fix:**
- Add more comprehensive analytics
- Add CSV export feature
- Add filtering by date range and email type
- Add statistical insights

---

## Future Enhancements

1. **AI Evaluation Improvements**
   - Support for multiple AI models (GPT-4, Gemini)
   - Customizable evaluation criteria
   - Teacher review mode

2. **Content Management**
   - Admin panel for adding email prompts
   - Batch import of prompts
   - Version control for prompts

3. **Advanced Features**
   - Collaborative practice sessions
   - Peer review functionality
   - Gamification (points, badges, leaderboards)
   - Scheduled practice reminders

4. **Mobile App**
   - Native iOS/Android apps
   - Offline practice mode
   - Push notifications

---

## Comments

This document should be updated as issues are discovered or resolved. Keep it in sync with the actual implementation.

