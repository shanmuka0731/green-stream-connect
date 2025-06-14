
-- Drop the trigger first
DROP TRIGGER IF EXISTS update_leaderboard_trigger ON public.pickup_orders;

-- Drop the function
DROP FUNCTION IF EXISTS public.update_leaderboard();

-- Drop the table
DROP TABLE IF EXISTS public.eco_score_leaderboard;
