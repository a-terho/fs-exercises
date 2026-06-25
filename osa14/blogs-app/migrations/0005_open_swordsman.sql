CREATE TABLE "blogs_app"."reading_list" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"blog_id" integer NOT NULL,
	"read" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blogs_app"."reading_list" ADD CONSTRAINT "reading_list_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "blogs_app"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blogs_app"."reading_list" ADD CONSTRAINT "reading_list_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "blogs_app"."blogs"("id") ON DELETE no action ON UPDATE no action;