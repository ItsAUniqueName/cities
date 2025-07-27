import app from "./server";
import dotenv from "dotenv";
import { logger } from "./logger";
import { connectPrisma, disconnectPrisma } from "./prisma";

dotenv.config();

const port = process.env.API_PORT;

app.listen(port, async () => {
    await connectPrisma();
    logger.info(`Server is listening at http://localhost:${port}`);
});

process.on('beforeExit', async () => {
  await disconnectPrisma();
});
process.on('SIGINT', async () => {
  await disconnectPrisma();
  process.exit(0);
});
process.on('SIGTERM', async () => {
  await disconnectPrisma();
  process.exit(0);
});