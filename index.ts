import express, {Express} from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import methodOverride from "method-override";

import { connectDatabase } from "./config/database";
import { routesAdmin } from "./routes/admin/index.route";
import { routesClient} from "./routes/client/index.route";
import { systemConfig } from "./config/system";
import path from "path";

connectDatabase();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// method-override
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static("public"));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

routesAdmin(app);
routesClient(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});