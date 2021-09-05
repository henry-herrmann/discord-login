const express = require("express");

const app = express();

app.use("/", require("./routers/redirect"));

app.listen(23456).then(()=> {
    console.log("Listening on 23456")
})