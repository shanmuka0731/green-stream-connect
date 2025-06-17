
-- Add organization_id to pickup_orders table to track which organization confirmed/accepted the order
ALTER TABLE public.pickup_orders 
ADD COLUMN organization_id UUID REFERENCES public.register_organizations(id),
ADD COLUMN pickup_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN pickup_address TEXT;

-- Update the status column to include new statuses
-- Current statuses: 'pending', now adding: 'confirmed', 'accepted', 'in_progress', 'completed'

-- Enable realtime for pickup_orders table
ALTER TABLE public.pickup_orders REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pickup_orders;

-- Add RLS policy for organizations to view pickup orders
CREATE POLICY "Organizations can view all pickup orders" 
  ON public.pickup_orders 
  FOR SELECT 
  USING (true);

-- Add RLS policy for organizations to update pickup orders they manage
CREATE POLICY "Organizations can update pickup orders they manage" 
  ON public.pickup_orders 
  FOR UPDATE 
  USING (organization_id IS NULL OR organization_id = (
    SELECT id FROM public.register_organizations 
    WHERE email = auth.jwt() ->> 'email'
  ));
