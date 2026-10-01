import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Agents } from "./collections/Agents";
import { AboutPage } from "./globals/AboutPage";
import { SiteSettings } from "./globals/SiteSettings";
import { Articles } from "./collections/Articles";
import { Inquiries } from "./collections/Inquiries";
import { Media } from "./collections/Media";
import { Neighborhoods } from "./collections/Neighborhoods";
import { Properties } from "./collections/Properties";
import { Testimonials } from "./collections/Testimonials";
import { Users } from "./collections/Users";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " | SLIIQQUE Admin",
      description: "Manage listings, agents and enquiries.",
      icons: [
        { rel: "icon", url: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          url: "/brand/favicon-32.png",
        },
        { rel: "apple-touch-icon", url: "/brand/apple-touch-icon.png" },
      ],
    },
    components: {
      graphics: {
        Logo: "/components/admin/Logo#default",
        Icon: "/components/admin/Icon#default",
      },
      beforeDashboard: ["/components/admin/Welcome#default"],
    },
  },
  collections: [
    Properties,
    Agents,
    Neighborhoods,
    Articles,
    Testimonials,
    Inquiries,
    Media,
    Users,
  ],
  globals: [SiteSettings, AboutPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || "" },
    // Dev: schema auto-syncs. Production must use migrations (`npm run payload migrate`).
    push: process.env.NODE_ENV !== "production",
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  sharp,
  plugins: [
    // Local disk doesn't persist on serverless hosts, so use Blob when a token is set.
    ...(blobToken
      ? [vercelBlobStorage({ collections: { media: true }, token: blobToken })]
      : []),
  ],
});
