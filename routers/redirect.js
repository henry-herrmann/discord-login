const express = require("express");
const axios = require("axios")
const router = express.Router();

router.get("/", (req, res) =>{
    console.log(req)
    if(req.query == undefined || req.query == null) return;

    console.log(req.query.code);
})

module.exports = router;