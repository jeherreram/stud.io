-- Restore proper RLS policies with auth check
-- Run this in Supabase SQL Editor

-- Fix user_responses policy
DROP POLICY IF EXISTS "Users can insert own responses" ON user_responses;
CREATE POLICY "Users can insert own responses"
  ON user_responses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Fix evaluations policy  
DROP POLICY IF EXISTS "Users can insert own evaluations" ON evaluations;
CREATE POLICY "Users can insert own evaluations"
  ON evaluations FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_responses
      WHERE user_responses.id = evaluations.response_id
      AND user_responses.user_id = auth.uid()
    )
  );

