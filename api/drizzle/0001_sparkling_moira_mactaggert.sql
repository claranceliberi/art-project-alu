ALTER TABLE "artworks" ADD COLUMN "is_sold" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "shipping_address" text NOT NULL;