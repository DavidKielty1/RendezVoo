import { PrismaClient } from "@prisma/client";

import { env } from "~/env";

console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("DATABASE_URL:", env.DATABASE_URL);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
