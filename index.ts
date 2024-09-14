import express, {Express} from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDatabase } from "./config/database";
import { routesClient} from "./routes/client/index.route";

connectDatabase();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");

routesClient(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});