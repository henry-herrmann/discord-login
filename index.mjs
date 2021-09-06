import express from "express"
import route from "./routers/guilds.js"
const app = express();

app.use("/guilds", route);

app.listen(23456)