import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();


const router = express.Router();

router.get("/", async (req, res) =>{

    if(req.cookies.user == undefined || req.cookies.user == null){
        res.redirect("https://discord.com/api/oauth2/authorize?client_id=884131363228356669&redirect_uri=http%3A%2F%2F144.91.78.22%3A23456%2Fauth&response_type=code&scope=identify%20guilds");
        return;
    }

    const access_token = req.cookies.user.split(";")[0];
    const token_type = req.cookies.user.split(";")[1];
    const expires_in = req.cookies.user.split(";")[2];
    const refresh_token = req.cookies.user.split(";")[3];

    if(Date.now() >= expires_in){
        const data = {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: refresh_token
        }

        const request = await fetch('https://discord.com/api/oauth2/token', {
            method: "POST",
            body: new URLSearchParams(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        const new_access_token_json = await request.json();

        res.cookie("user", `${new_access_token_json.access_token};${new_access_token_json.token_type};${Date.now()+new_access_token_json.expires_in};${new_access_token_json.refresh_token};${new_access_token_json.scope}`);
    }

    const json = await token_response.json();
    
    const guilds_response = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
            authorization: `${token_type} ${access_token}`
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