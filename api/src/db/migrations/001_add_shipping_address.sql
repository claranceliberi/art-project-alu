-- Add shipping_address column to transactions table
ALTER TABLE transactions ADD COLUMN shipping_address TEXT NOT NULL DEFAULT '{}'; 