import express from "express"
import route from "./routers/guild.js"
const app = express();

app.use("/guild", route);

app.listen(23456)