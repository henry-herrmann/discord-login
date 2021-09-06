import express from "express";

const app = express();

app.use("/", require("./routers/redirect"));

app.listen(23456)