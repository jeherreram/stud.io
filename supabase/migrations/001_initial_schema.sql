-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create email_prompts table
CREATE TABLE IF NOT EXISTS email_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('formal', 'semi-formal', 'informal')),
  difficulty INTEGER NOT NULL CHECK (difficulty BETWEEN 1 AND 5),
  scenario TEXT NOT NULL,
  sender TEXT NOT NULL,
  content TEXT NOT NULL,
  required_points TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_responses table
CREATE TABLE IF NOT EXISTS user_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  prompt_id UUID REFERENCES email_prompts NOT NULL,
  content TEXT NOT NULL,
  word_count INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create evaluations table
CREATE TABLE IF NOT EXISTS evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  response_id UUID REFERENCES user_responses NOT NULL,
  criterion_i_grade TEXT NOT NULL CHECK (criterion_i_grade IN ('A', 'B', 'C', 'D')),
  criterion_i_points INTEGER NOT NULL,
  criterion_ii_grade TEXT NOT NULL CHECK (criterion_ii_grade IN ('A', 'B', 'C', 'D')),
  criterion_ii_points INTEGER NOT NULL,
  criterion_iii_grade TEXT NOT NULL CHECK (criterion_iii_grade IN ('A', 'B', 'C', 'D')),
  criterion_iii_points INTEGER NOT NULL,
  total_points INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  feedback TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_weaknesses table
CREATE TABLE IF NOT EXISTS user_weaknesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  evaluation_id UUID REFERENCES evaluations NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'CASE_ERRORS',
    'VERB_CONJUGATION',
    'WORD_ORDER',
    'VOCABULARY_CHOICE',
    'EMAIL_FORMAT',
    'CONTENT_COMPLETENESS',
    'SPELLING_ERRORS',
    'SENTENCE_STRUCTURE'
  )),
  severity TEXT NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH')),
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create progress_stats table
CREATE TABLE IF NOT EXISTS progress_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  total_attempts INTEGER DEFAULT 0,
  total_passed INTEGER DEFAULT 0,
  avg_score NUMERIC(5,2),
  last_practice_date TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_weaknesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create policies for user_responses
CREATE POLICY "Users can view own responses"
  ON user_responses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own responses"
  ON user_responses FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own responses"
  ON user_responses FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policies for evaluations
CREATE POLICY "Users can view own evaluations"
  ON evaluations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_responses
      WHERE user_responses.id = evaluations.response_id
      AND user_responses.user_id = auth.uid()
    )
  );

-- Create policies for user_weaknesses
CREATE POLICY "Users can view own weaknesses"
  ON user_weaknesses FOR SELECT
  USING (auth.uid() = user_id);

-- Create policies for progress_stats
CREATE POLICY "Users can view own stats"
  ON progress_stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own stats"
  ON progress_stats FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to automatically create profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  INSERT INTO public.progress_stats (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

