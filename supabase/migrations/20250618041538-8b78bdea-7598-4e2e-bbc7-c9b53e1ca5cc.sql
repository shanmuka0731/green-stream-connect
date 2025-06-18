
-- Add a user_id column to register_organizations to link organizations to users
ALTER TABLE public.register_organizations ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create an index for better performance when querying by user_id
CREATE INDEX IF NOT EXISTS idx_register_organizations_user_id ON public.register_organizations(user_id);

-- Add Row Level Security policies so users can only see their own organizations
ALTER TABLE public.register_organizations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and create new ones for register_organizations
DROP POLICY IF EXISTS "Users can view their own organizations" ON public.register_organizations;
CREATE POLICY "Users can view their own organizations" 
  ON public.register_organizations 
  FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create organizations" ON public.register_organizations;
CREATE POLICY "Users can create organizations" 
  ON public.register_organizations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own organizations" ON public.register_organizations;
CREATE POLICY "Users can update their own organizations" 
  ON public.register_organizations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own organizations" ON public.register_organizations;
CREATE POLICY "Users can delete their own organizations" 
  ON public.register_organizations 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Update the RLS policies for pickup_orders to work with organization ownership
DROP POLICY IF EXISTS "Organizations can update pickup orders they manage" ON public.pickup_orders;
CREATE POLICY "Organizations can update pickup orders they manage" 
  ON public.pickup_orders 
  FOR UPDATE 
  USING (
    organization_id IS NULL OR 
    organization_id IN (
      SELECT id FROM public.register_organizations 
      WHERE user_id = auth.uid()
    )
  );
