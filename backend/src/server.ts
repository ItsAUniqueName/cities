import express, {NextFunction, Request, Response} from "express";
import cityRoutes from "./router/cityRoutes";
import countyRoutes from "./router/countyRoutes";
import { logger } from "./logger";
import cors from 'cors';


//contains all server settings
const app = express();

const whitelist = ['*', 'http://localhost:4200']
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) => void) => {
        if (whitelist.indexOf(origin!) !== -1 || whitelist.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS.'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/county", countyRoutes);
app.use("/city", cityRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Unhandled Error: ${err.message}`, { stack: err.stack, url: req.originalUrl, method: req.method });
  res.status(500).send('Internal Server Error');
});

export default app;