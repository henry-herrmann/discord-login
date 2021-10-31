import express from "express";
import guilds from "./routers/guilds.mjs";
import auth from "./routers/auth";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use("/auth/", auth);
app.use("/guilds", guilds);

app.listen(23456)
console.log("[REST-API] Listening on port 23456")