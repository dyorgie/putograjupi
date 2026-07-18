import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const prismaClientSingleton = () => {
  // Initialize the PostgreSQL adapter with your connection string
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });
  
  // Pass the adapter to the Prisma Client constructor
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;