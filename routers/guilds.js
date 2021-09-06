
const express = require("express");
const fetch = require("node-fetch")
require("dotenv").config


const router = express.Router();

router.get("/", async (req, res) =>{
    if(req.query == undefined || req.query == null) return;

    const data = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: process.env.REDIRECT_URI,
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
    const guild = guilds.find(search => search.id == process.env.SERVER_ID);

    if(guild == undefined){
        res.status(400).send("You are not a member of the discord server.")
    }else{
        res.status(200).send("Welcome discord server member!")
    }
})

export default router;