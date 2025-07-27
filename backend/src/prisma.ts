import { PrismaClient } from './generated/prisma';
import { logger } from './logger';


const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'warn', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

async function connectPrisma() {
  try {
    await prisma.$connect();
    logger.info('Connected to Prisma database.');
  } catch (error) {
    logger.error('Failed to connect to Prisma database:', error);
    process.exit(1);
  }
}

async function disconnectPrisma() {
  try {
    await prisma.$disconnect();
    logger.info('Disconnected from Prisma database.');
  } catch (error) {
    logger.error('Failed to disconnect from Prisma database:', error);
  }
}

export { prisma, connectPrisma, disconnectPrisma };