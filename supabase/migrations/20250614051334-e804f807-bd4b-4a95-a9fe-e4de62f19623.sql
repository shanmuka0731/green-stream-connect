
-- Create register_organizations table
CREATE TABLE public.register_organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  description TEXT NOT NULL,
  waste_types TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pickup_orders table
CREATE TABLE public.pickup_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  waste_type TEXT NOT NULL,
  waste_subtype TEXT,
  weight DECIMAL NOT NULL,
  description TEXT,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  reward_type TEXT,
  reward_amount DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create eco_score_leaderboard table
CREATE TABLE public.eco_score_leaderboard (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  total_cash_earned DECIMAL NOT NULL DEFAULT 0,
  total_eco_points INTEGER NOT NULL DEFAULT 0,
  total_orders INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add avatar_url to profiles table
ALTER TABLE public.profiles ADD COLUMN avatar_url TEXT;

-- Add RLS policies for pickup_orders
ALTER TABLE public.pickup_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own pickup orders" 
  ON public.pickup_orders 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own pickup orders" 
  ON public.pickup_orders 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pickup orders" 
  ON public.pickup_orders 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Add RLS policies for eco_score_leaderboard
ALTER TABLE public.eco_score_leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view leaderboard" 
  ON public.eco_score_leaderboard 
  FOR SELECT 
  USING (true);

CREATE POLICY "Users can update their own leaderboard entry" 
  ON public.eco_score_leaderboard 
  FOR ALL 
  USING (auth.uid() = user_id);

-- Make register_organizations publicly readable (for display purposes)
ALTER TABLE public.register_organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view organizations" 
  ON public.register_organizations 
  FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can register organizations" 
  ON public.register_organizations 
  FOR INSERT 
  WITH CHECK (true);

-- Create function to update leaderboard when pickup order is completed
CREATE OR REPLACE FUNCTION public.update_leaderboard()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    INSERT INTO public.eco_score_leaderboard (user_id, total_cash_earned, total_eco_points, total_orders)
    VALUES (
      NEW.user_id,
      CASE WHEN NEW.reward_type = 'cash' THEN NEW.reward_amount ELSE 0 END,
      CASE WHEN NEW.reward_type = 'ecoscore' THEN NEW.reward_amount::INTEGER ELSE 0 END,
      1
    )
    ON CONFLICT (user_id) DO UPDATE SET
      total_cash_earned = eco_score_leaderboard.total_cash_earned + 
        CASE WHEN NEW.reward_type = 'cash' THEN NEW.reward_amount ELSE 0 END,
      total_eco_points = eco_score_leaderboard.total_eco_points + 
        CASE WHEN NEW.reward_type = 'ecoscore' THEN NEW.reward_amount::INTEGER ELSE 0 END,
      total_orders = eco_score_leaderboard.total_orders + 1,
      updated_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for leaderboard updates
CREATE TRIGGER update_leaderboard_trigger
  AFTER UPDATE ON public.pickup_orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_leaderboard();
