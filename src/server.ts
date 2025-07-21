import express, {Request, Response} from "express";
import cityRoutes from "./router/cityRoutes";
import countyRoutes from "./router/countyRoutes";

const app = express();

app.use(express.json());

app.use("/county", countyRoutes);
app.use("/city", cityRoutes);

export default app;