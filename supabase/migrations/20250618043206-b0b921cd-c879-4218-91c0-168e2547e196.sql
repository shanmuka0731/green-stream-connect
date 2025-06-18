
-- Add language_preference column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS language_preference TEXT DEFAULT 'en';

-- Create an index for better performance when querying by language preference
CREATE INDEX IF NOT EXISTS idx_profiles_language_preference ON public.profiles(language_preference);

-- Update existing profiles to have default language preference
UPDATE public.profiles SET language_preference = 'en' WHERE language_preference IS NULL;
