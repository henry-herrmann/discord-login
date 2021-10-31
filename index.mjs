import express from "express";
import route from "./routers/guilds.mjs";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use("/guilds", route);

app.listen(23456);