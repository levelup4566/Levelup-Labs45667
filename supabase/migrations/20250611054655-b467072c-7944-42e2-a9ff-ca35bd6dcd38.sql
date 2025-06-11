
-- Create user_stats table for tracking user progress and points
CREATE TABLE public.user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  total_skill_points INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  experience_points INTEGER DEFAULT 0,
  points_to_next_level INTEGER DEFAULT 100,
  courses_completed INTEGER DEFAULT 0,
  videos_watched INTEGER DEFAULT 0,
  total_study_time_minutes INTEGER DEFAULT 0,
  is_new_user BOOLEAN DEFAULT true,
  login_streak_days INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_course_enrollments table for tracking course progress
CREATE TABLE public.user_course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL,
  course_id TEXT NOT NULL,
  progress_percentage INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  last_accessed_at TIMESTAMP WITH TIME ZONE,
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(clerk_user_id, course_id)
);

-- Create user_skills table for tracking individual skills
CREATE TABLE public.user_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL,
  skill_name TEXT NOT NULL,
  skill_level INTEGER DEFAULT 1,
  skill_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(clerk_user_id, skill_name)
);

-- Create user_badges table for tracking earned badges
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  badge_description TEXT,
  badge_icon TEXT,
  badge_color TEXT,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(clerk_user_id, badge_name)
);

-- Enable RLS on new tables
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own stats" ON public.user_stats
  FOR SELECT USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can manage their own stats" ON public.user_stats
  FOR ALL USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can view their own enrollments" ON public.user_course_enrollments
  FOR SELECT USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can manage their own enrollments" ON public.user_course_enrollments
  FOR ALL USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can view their own skills" ON public.user_skills
  FOR SELECT USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can manage their own skills" ON public.user_skills
  FOR ALL USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can view their own badges" ON public.user_badges
  FOR SELECT USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can manage their own badges" ON public.user_badges
  FOR ALL USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Create initialize_new_user function
CREATE OR REPLACE FUNCTION public.initialize_new_user(user_id TEXT)
RETURNS VOID AS $$
BEGIN
  -- Insert user stats if not exists
  INSERT INTO public.user_stats (clerk_user_id)
  VALUES (user_id)
  ON CONFLICT (clerk_user_id) DO NOTHING;
  
  -- Insert learning streak if not exists
  INSERT INTO public.learning_streaks (clerk_user_id)
  VALUES (user_id)
  ON CONFLICT (clerk_user_id) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create award_points function
CREATE OR REPLACE FUNCTION public.award_points(user_id TEXT, points INTEGER, activity_desc TEXT DEFAULT NULL)
RETURNS VOID AS $$
DECLARE
  current_points INTEGER;
  new_total INTEGER;
  new_level INTEGER;
BEGIN
  -- Get current points
  SELECT total_skill_points INTO current_points
  FROM public.user_stats
  WHERE clerk_user_id = user_id;
  
  -- Calculate new totals
  new_total := COALESCE(current_points, 0) + points;
  new_level := GREATEST(1, new_total / 100 + 1);
  
  -- Update user stats
  UPDATE public.user_stats
  SET 
    total_skill_points = new_total,
    current_level = new_level,
    experience_points = new_total,
    points_to_next_level = (new_level * 100) - new_total,
    updated_at = now()
  WHERE clerk_user_id = user_id;
  
  -- If video completion, increment videos watched
  IF activity_desc ILIKE '%video%' OR activity_desc ILIKE '%lesson%' THEN
    UPDATE public.user_stats
    SET videos_watched = videos_watched + 1
    WHERE clerk_user_id = user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create complete_onboarding function
CREATE OR REPLACE FUNCTION public.complete_onboarding(
  user_id TEXT,
  learning_goal TEXT,
  experience_level TEXT,
  time_commitment TEXT
)
RETURNS VOID AS $$
BEGIN
  -- Update user profile
  INSERT INTO public.user_profiles (clerk_user_id, learning_goal, experience_level, time_commitment)
  VALUES (user_id, learning_goal, experience_level, time_commitment)
  ON CONFLICT (clerk_user_id) 
  DO UPDATE SET
    learning_goal = EXCLUDED.learning_goal,
    experience_level = EXCLUDED.experience_level,
    time_commitment = EXCLUDED.time_commitment,
    updated_at = now();
  
  -- Mark user as no longer new
  UPDATE public.user_stats
  SET is_new_user = false
  WHERE clerk_user_id = user_id;
  
  -- Award onboarding points
  PERFORM public.award_points(user_id, 10, 'Completed onboarding');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
