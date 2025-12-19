-- Fix shipments table to stop syncing image_url from products table
-- This will:
-- 1. Drop the existing trigger that syncs image_url
-- 2. Set all existing image_urls in shipments to 'N/A'
-- 3. Create a new trigger that syncs everything EXCEPT image_url
-- 4. New products will get 'N/A' for image_url automatically

-- Step 1: Drop the existing sync trigger if it exists
DROP TRIGGER IF EXISTS sync_products_to_shipments ON products;
DROP FUNCTION IF EXISTS sync_products_to_shipments_fn();

-- Step 2: Set all existing image_urls in shipments to 'N/A'
UPDATE shipments
SET image_url = 'N/A'
WHERE image_url IS NOT NULL AND image_url != 'N/A';

-- Step 3: Create new trigger function that syncs everything EXCEPT image_url
CREATE OR REPLACE FUNCTION sync_products_to_shipments_fn()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Insert new product into shipments with image_url as 'N/A'
    INSERT INTO shipments (
      id, name, description, category, status, sku, price, 
      buy_link, image_url, group_name, color, hex_color, 
      specifications, variant_order, created_at
    )
    VALUES (
      NEW.id, NEW.name, NEW.description, NEW.category, NEW.status, 
      NEW.sku, NEW.price, NEW.buy_link, 'N/A', NEW.group_name, 
      NEW.color, NEW.hex_color, NEW.specifications, NEW.variant_order, 
      NEW.created_at
    );
    
  ELSIF TG_OP = 'UPDATE' THEN
    -- Update existing shipment record, but preserve the image_url
    UPDATE shipments
    SET 
      name = NEW.name,
      description = NEW.description,
      category = NEW.category,
      status = NEW.status,
      sku = NEW.sku,
      price = NEW.price,
      buy_link = NEW.buy_link,
      -- image_url is NOT updated here - it stays as is
      group_name = NEW.group_name,
      color = NEW.color,
      hex_color = NEW.hex_color,
      specifications = NEW.specifications,
      variant_order = NEW.variant_order
    WHERE id = NEW.id;
    
  ELSIF TG_OP = 'DELETE' THEN
    -- Delete from shipments when deleted from products
    DELETE FROM shipments WHERE id = OLD.id;
    RETURN OLD;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 4: Create the trigger
CREATE TRIGGER sync_products_to_shipments
AFTER INSERT OR UPDATE OR DELETE ON products
FOR EACH ROW
EXECUTE FUNCTION sync_products_to_shipments_fn();

-- Verification queries (run these to check the results)
-- SELECT COUNT(*) as total_shipments, 
--        COUNT(CASE WHEN image_url = 'N/A' THEN 1 END) as na_count,
--        COUNT(CASE WHEN image_url != 'N/A' THEN 1 END) as custom_count
-- FROM shipments;
