import express from "express"
import route from "./routers/redirect"
const app = express();

app.use("/", route);

app.listen(23456)