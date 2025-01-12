import { PrismaClient } from "@prisma/client";

export const prisma = global.prisma || new PrismaClient({});

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "development") global.prisma = prisma;
