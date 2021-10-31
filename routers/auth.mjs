import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();


const router = express.Router();

router.get("/", async (req, res) =>{
    if(Object.keys(req.query).length != 0){
        if(Object.keys(req.cookies).length == 0){
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
    
            res.cookie("data", `${json.access_token}${json.token_type};${Date.now()+json.expires_in};${json.refresh_token};${json.scope}`);
            res.redirect("http://202.61.201.124:23456/guilds")
        }else if(Object.keys(req.cookies).length != 0){
            const access_token = req.cookies.data.split(";")[0];
            const token_type = req.cookies.data.split(";")[1];
            const expires_in = req.cookies.data.split(";")[2];
            const refresh_token = req.cookies.data.split(";")[3];
            const scope = req.cookies.data.split(";")[4];

            console.log(access_token, token_type, expires_in)

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
        
                res.cookie("data", `${new_access_token_json.access_token};${new_access_token_json.token_type};${Date.now()+new_access_token_json.expires_in};${new_access_token_json.refresh_token};${new_access_token_json.scope}`);
                res.redirect("http://202.61.201.124:23456/guilds/")
            }else{
                console.log("yes")
                res.redirect("http://202.61.201.124:23456/guilds/") 
            }
        }
    }else{
        res.redirect("https://discord.com/api/oauth2/authorize?client_id=884131363228356669&redirect_uri=http%3A%2F%2F202.61.201.124%3A23456%2Fauth&response_type=code&scope=identify%20guilds")
    }
})

export default router;