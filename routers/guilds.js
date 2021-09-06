import express from "express";
import fetch from "node-fetch";
const router = express.Router();

router.get("/", async (req, res) =>{
    if(req.query == undefined || req.query == null) return;

    const data = {
        client_id: "884131363228356669",
        client_secret: "FP8_yZGbSXZbiGUlkxP2ZRboN1QaBFFT",
        grant_type: "authorization_code",
        redirect_uri: "http://144.91.78.22:23456/guilds",
        code: req.query.code
    }
    const token_response = await fetch('https://discord.com/api/oauth2/token', {
        method: "POST",
        body: new URLSearchParams(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    const json = await token_response.json();
    
    const guilds_response = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
            authorization: `${json.token_type} ${json.access_token}`
        }
    })
    const guilds = await guilds_response.json();
    const guild = guilds.find(search => search.id == "660254038901653506");

    if(guild == undefined){
        res.status(400).send("You are not a member of the discord server.")
    }else{
        res.status(200).send("Welcome discord server member!")
    }
})

export default router;