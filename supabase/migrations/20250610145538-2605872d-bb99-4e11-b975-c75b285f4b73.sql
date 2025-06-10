
-- Create user profiles table to extend Clerk auth data
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  learning_goal TEXT,
  experience_level TEXT,
  time_commitment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty_level TEXT NOT NULL,
  estimated_duration_hours INTEGER,
  total_modules INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create course modules table
CREATE TABLE public.course_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subtitle TEXT,
  module_order INTEGER NOT NULL,
  total_videos INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create videos table
CREATE TABLE public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES public.course_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration TEXT,
  video_url TEXT,
  video_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user progress table
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  module_id UUID REFERENCES public.course_modules(id) ON DELETE CASCADE,
  video_id UUID REFERENCES public.videos(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  time_spent_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(clerk_user_id, video_id)
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_name TEXT,
  points_required INTEGER DEFAULT 0,
  achievement_type TEXT DEFAULT 'milestone',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user achievements table
CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL,
  achievement_id UUID REFERENCES public.achievements(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(clerk_user_id, achievement_id)
);

-- Create resources table
CREATE TABLE public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  resource_type TEXT DEFAULT 'article',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user bookmarks table
CREATE TABLE public.user_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL,
  resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(clerk_user_id, resource_id)
);

-- Create user resource ratings table
CREATE TABLE public.user_resource_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT NOT NULL,
  resource_id UUID REFERENCES public.resources(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(clerk_user_id, resource_id)
);

-- Create learning streaks table
CREATE TABLE public.learning_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  streak_start_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_resource_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_streaks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user-specific data
CREATE POLICY "Users can view their own profile" ON public.user_profiles
  FOR SELECT USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update their own profile" ON public.user_profiles
  FOR ALL USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can view their own progress" ON public.user_progress
  FOR SELECT USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can manage their own progress" ON public.user_progress
  FOR ALL USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can view their own achievements" ON public.user_achievements
  FOR SELECT USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can view their own bookmarks" ON public.user_bookmarks
  FOR ALL USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can manage their own ratings" ON public.user_resource_ratings
  FOR ALL USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can view their own streaks" ON public.learning_streaks
  FOR ALL USING (clerk_user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Public read policies for shared data
CREATE POLICY "Everyone can view courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Everyone can view modules" ON public.course_modules FOR SELECT USING (true);
CREATE POLICY "Everyone can view videos" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Everyone can view achievements" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Everyone can view resources" ON public.resources FOR SELECT USING (true);

-- Insert sample data
INSERT INTO public.achievements (name, description, icon_name, points_required, achievement_type) VALUES
('Early Adopter', 'Joined the platform', 'star', 0, 'milestone'),
('First Course', 'Completed your first course', 'award', 25, 'completion'),
('Learning Streak', '5-day learning streak', 'calendar', 15, 'streak'),
('Skill Builder', 'Earned 50 skill points', 'zap', 50, 'points'),
('Resource Hunter', 'Bookmarked 10 resources', 'bookmark', 10, 'engagement');

-- Insert sample courses
INSERT INTO public.courses (title, description, category, difficulty_level, estimated_duration_hours, total_modules) VALUES
('Web Development Fundamentals', 'Learn the basics of web development', 'coding', 'beginner', 40, 2),
('UI/UX Design Essentials', 'Master design principles and user experience', 'design', 'beginner', 35, 2),
('Data Science and Analysis', 'Introduction to data science concepts', 'data', 'beginner', 45, 2);

-- Get course IDs for modules
DO $$
DECLARE
    web_course_id UUID;
    design_course_id UUID;
    data_course_id UUID;
BEGIN
    SELECT id INTO web_course_id FROM public.courses WHERE title = 'Web Development Fundamentals';
    SELECT id INTO design_course_id FROM public.courses WHERE title = 'UI/UX Design Essentials';
    SELECT id INTO data_course_id FROM public.courses WHERE title = 'Data Science and Analysis';
    
    -- Insert modules for web development
    INSERT INTO public.course_modules (course_id, title, subtitle, module_order, total_videos) VALUES
    (web_course_id, 'Module 1: Basics of Web Development', '(3 subtopics)', 1, 4),
    (web_course_id, 'Module 2: JavaScript Fundamentals', '(4 subtopics)', 2, 4);
    
    -- Insert modules for design
    INSERT INTO public.course_modules (course_id, title, subtitle, module_order, total_videos) VALUES
    (design_course_id, 'Module 1: Design Fundamentals', '(4 subtopics)', 1, 3),
    (design_course_id, 'Module 2: Layout and Composition', '(3 subtopics)', 2, 1);
    
    -- Insert modules for data science
    INSERT INTO public.course_modules (course_id, title, subtitle, module_order, total_videos) VALUES
    (data_course_id, 'Module 1: Basics of Data Science', '(3 subtopics)', 1, 2);
END $$;

-- Insert sample resources
INSERT INTO public.resources (title, description, url, category, difficulty, rating, tags, resource_type) VALUES
('HTML Fundamentals Guide', 'Complete guide to HTML basics', 'https://example.com/html-guide', 'Programming', 'beginner', 4.5, ARRAY['html', 'web'], 'article'),
('CSS Flexbox Tutorial', 'Master CSS Flexbox layout', 'https://example.com/flexbox', 'Programming', 'intermediate', 4.8, ARRAY['css', 'layout'], 'tutorial'),
('JavaScript ES6 Features', 'Modern JavaScript features explained', 'https://example.com/es6', 'Programming', 'intermediate', 4.7, ARRAY['javascript', 'es6'], 'article'),
('Design Thinking Process', 'Introduction to design thinking', 'https://example.com/design-thinking', 'Design', 'beginner', 4.6, ARRAY['design', 'process'], 'article'),
('Color Theory Basics', 'Understanding color in design', 'https://example.com/color-theory', 'Design', 'beginner', 4.4, ARRAY['design', 'color'], 'tutorial'),
('Data Visualization Guide', 'Creating effective data visualizations', 'https://example.com/dataviz', 'Data Science', 'intermediate', 4.7, ARRAY['data', 'visualization'], 'article');

-- Create function to update streak
CREATE OR REPLACE FUNCTION update_learning_streak(user_id TEXT)
RETURNS VOID AS $$
DECLARE
    today_date DATE := CURRENT_DATE;
    last_activity DATE;
    current_streak_val INTEGER;
    longest_streak_val INTEGER;
BEGIN
    -- Get current streak data
    SELECT last_activity_date, current_streak, longest_streak 
    INTO last_activity, current_streak_val, longest_streak_val
    FROM public.learning_streaks 
    WHERE clerk_user_id = user_id;
    
    -- If no record exists, create one
    IF NOT FOUND THEN
        INSERT INTO public.learning_streaks (clerk_user_id, current_streak, longest_streak, last_activity_date, streak_start_date)
        VALUES (user_id, 1, 1, today_date, today_date);
        RETURN;
    END IF;
    
    -- If last activity was yesterday, increment streak
    IF last_activity = today_date - INTERVAL '1 day' THEN
        current_streak_val := current_streak_val + 1;
        longest_streak_val := GREATEST(longest_streak_val, current_streak_val);
    -- If last activity was today, do nothing
    ELSIF last_activity = today_date THEN
        RETURN;
    -- If gap is more than 1 day, reset streak
    ELSE
        current_streak_val := 1;
    END IF;
    
    -- Update the record
    UPDATE public.learning_streaks 
    SET current_streak = current_streak_val,
        longest_streak = longest_streak_val,
        last_activity_date = today_date,
        updated_at = now()
    WHERE clerk_user_id = user_id;
END;
$$ LANGUAGE plpgsql;
