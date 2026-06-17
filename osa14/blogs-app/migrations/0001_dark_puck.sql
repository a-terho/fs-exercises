CREATE TABLE "blogs_app"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blogs_app"."blogs" ADD COLUMN "user_id" integer;--> statement-breakpoint
ALTER TABLE "blogs_app"."blogs" ADD CONSTRAINT "blogs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "blogs_app"."users"("id") ON DELETE no action ON UPDATE no action;