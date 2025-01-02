import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./drizzle/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});
