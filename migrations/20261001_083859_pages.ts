import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_articles_category" ADD VALUE 'Selling Tips' BEFORE 'Investment';
  ALTER TYPE "public"."enum_articles_category" ADD VALUE 'Renting' BEFORE 'Investment';
  ALTER TYPE "public"."enum_inquiries_type" ADD VALUE 'subscribe';
  CREATE TABLE "agents_specialties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"days" varchar NOT NULL,
  	"hours" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar DEFAULT 'SLIIQQUE Real Estate' NOT NULL,
  	"tagline" varchar,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"whatsapp" varchar,
  	"address" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_page_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "about_page_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar NOT NULL,
  	"intro" varchar NOT NULL,
  	"hero_image_id" integer,
  	"story" jsonb,
  	"closing_title" varchar,
  	"closing_text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "agents" ADD COLUMN "slug" varchar;
  ALTER TABLE "agents" ADD COLUMN "years_experience" numeric;
  ALTER TABLE "articles" ADD COLUMN "excerpt" varchar;
  ALTER TABLE "articles" ADD COLUMN "author_id" integer;
  ALTER TABLE "inquiries" ADD COLUMN "agent_id" integer;
  ALTER TABLE "agents_specialties" ADD CONSTRAINT "agents_specialties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_hours" ADD CONSTRAINT "site_settings_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_socials" ADD CONSTRAINT "site_settings_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_faqs" ADD CONSTRAINT "site_settings_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_stats" ADD CONSTRAINT "about_page_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_values" ADD CONSTRAINT "about_page_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "agents_specialties_order_idx" ON "agents_specialties" USING btree ("_order");
  CREATE INDEX "agents_specialties_parent_id_idx" ON "agents_specialties" USING btree ("_parent_id");
  CREATE INDEX "site_settings_hours_order_idx" ON "site_settings_hours" USING btree ("_order");
  CREATE INDEX "site_settings_hours_parent_id_idx" ON "site_settings_hours" USING btree ("_parent_id");
  CREATE INDEX "site_settings_socials_order_idx" ON "site_settings_socials" USING btree ("_order");
  CREATE INDEX "site_settings_socials_parent_id_idx" ON "site_settings_socials" USING btree ("_parent_id");
  CREATE INDEX "site_settings_faqs_order_idx" ON "site_settings_faqs" USING btree ("_order");
  CREATE INDEX "site_settings_faqs_parent_id_idx" ON "site_settings_faqs" USING btree ("_parent_id");
  CREATE INDEX "about_page_stats_order_idx" ON "about_page_stats" USING btree ("_order");
  CREATE INDEX "about_page_stats_parent_id_idx" ON "about_page_stats" USING btree ("_parent_id");
  CREATE INDEX "about_page_values_order_idx" ON "about_page_values" USING btree ("_order");
  CREATE INDEX "about_page_values_parent_id_idx" ON "about_page_values" USING btree ("_parent_id");
  CREATE INDEX "about_page_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_agents_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."agents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "agents_slug_idx" ON "agents" USING btree ("slug");
  CREATE INDEX "articles_author_idx" ON "articles" USING btree ("author_id");
  CREATE INDEX "inquiries_agent_idx" ON "inquiries" USING btree ("agent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "agents_specialties" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_hours" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "about_page" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "agents_specialties" CASCADE;
  DROP TABLE "site_settings_hours" CASCADE;
  DROP TABLE "site_settings_socials" CASCADE;
  DROP TABLE "site_settings_faqs" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "about_page_stats" CASCADE;
  DROP TABLE "about_page_values" CASCADE;
  DROP TABLE "about_page" CASCADE;
  ALTER TABLE "articles" DROP CONSTRAINT "articles_author_id_agents_id_fk";
  
  ALTER TABLE "inquiries" DROP CONSTRAINT "inquiries_agent_id_agents_id_fk";
  
  ALTER TABLE "articles" ALTER COLUMN "category" SET DATA TYPE text;
  DROP TYPE "public"."enum_articles_category";
  CREATE TYPE "public"."enum_articles_category" AS ENUM('Market Trends', 'Buying Guide', 'Investment');
  ALTER TABLE "articles" ALTER COLUMN "category" SET DATA TYPE "public"."enum_articles_category" USING "category"::"public"."enum_articles_category";
  ALTER TABLE "inquiries" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "inquiries" ALTER COLUMN "type" SET DEFAULT 'contact'::text;
  DROP TYPE "public"."enum_inquiries_type";
  CREATE TYPE "public"."enum_inquiries_type" AS ENUM('contact', 'sell', 'viewing');
  ALTER TABLE "inquiries" ALTER COLUMN "type" SET DEFAULT 'contact'::"public"."enum_inquiries_type";
  ALTER TABLE "inquiries" ALTER COLUMN "type" SET DATA TYPE "public"."enum_inquiries_type" USING "type"::"public"."enum_inquiries_type";
  DROP INDEX "agents_slug_idx";
  DROP INDEX "articles_author_idx";
  DROP INDEX "inquiries_agent_idx";
  ALTER TABLE "agents" DROP COLUMN "slug";
  ALTER TABLE "agents" DROP COLUMN "years_experience";
  ALTER TABLE "articles" DROP COLUMN "excerpt";
  ALTER TABLE "articles" DROP COLUMN "author_id";
  ALTER TABLE "inquiries" DROP COLUMN "agent_id";`)
}
