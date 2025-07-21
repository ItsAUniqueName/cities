import app from "./server";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.API_PORT;

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});