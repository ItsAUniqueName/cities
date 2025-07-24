import express, {NextFunction, Request, Response} from "express";
import cityRoutes from "./router/cityRoutes";
import countyRoutes from "./router/countyRoutes";
import { logger } from "./logger";

const app = express();

app.use(express.json());

app.use("/county", countyRoutes);
app.use("/city", cityRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Unhandled Error: ${err.message}`, { stack: err.stack, url: req.originalUrl, method: req.method });
  res.status(500).send('Internal Server Error');
});

export default app;