import db from './utils/connection.js';
import './models/OrderModels.js';
import './models/AdminModels.js';
import './models/ProductModels.js';
import './models/UsersModels.js';
import './models/TransaksiModels.js';
import "./models/index.js"
import express from "express"
import bodyParser from "body-parser"
import router from "./routes/route.js"
import cors from "cors"
import cookieParser from 'cookie-parser';

const app = express()
const port = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/", router);

app.listen(port, () => {
    console.log(`server running at ${port}`);
})