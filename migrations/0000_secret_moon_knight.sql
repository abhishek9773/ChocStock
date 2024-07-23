CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar(80) NOT NULL,
	"provier" varchar(20),
	"external_id" varchar(100) NOT NULL,
	"image" text NOT NULL,
	"role" varchar(12) DEFAULT 'customer' NOT NULL,
	"update_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
