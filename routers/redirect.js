import express from "express";
import fetch from "node-fetch";
const router = express.Router();

router.get("/", async (req, res) =>{
    if(req.query == undefined || req.query == null) return;

    const data = {
        client_id: "884131363228356669",
        client_secret: "FP8_yZGbSXZbiGUlkxP2ZRboN1QaBFFT",
        grant_type: "authorization_code",
        redirect_uri: "https://google.com",
        code: req.query.code
    }
    const response = await fetch('https://discord.com/api/oauth2/token', {
        method: "POST",
        body: new URLSearchParams(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    const json = response.json();
    
    console.log(json)
    res.status(200).send("Worked")
})

export default router;