import express from "express"
import route from "./routers/redirect.js"
const app = express();

app.use("/", route);

app.listen(23456)