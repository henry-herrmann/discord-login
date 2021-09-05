const express = require("express");
const axios = require("axios")
const router = express.Router();

router.get("/", async (req, res) =>{
    if(req.query == undefined || req.query == null) return;

    const response = await axios({
        method: "post",
        url: "https://discord.com/api/oauth2/token",
        data: {
            client_id: '884131363228356669',
            client_secret: 'FP8_yZGbSXZbiGUlkxP2ZRboN1QaBFFT',
            grant_type: 'authorization_code',
            code: req.query.code,
            redirect_uri: "https://google.com"
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    console.log(response)
    res.status(200).send("Worked")
})

module.exports = router;