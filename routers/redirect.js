const express = require("express");
const axios = require("axios")
const router = express.Router();

router.get("/", (req, res) =>{
    if(req.query == undefined || req.query == null) return;

    console.log(req.query.code);
    res.status(200).send("Worked")
})

module.exports = router;