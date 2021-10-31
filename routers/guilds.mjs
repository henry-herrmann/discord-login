import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();


const router = express.Router();

router.get("/", async (req, res) =>{


    const access_token = req.cookies.data.split(";")[0];
    const token_type = req.cookies.data.split(";")[1];
    const expires_in = req.cookies.data.split(";")[2];

    if(Date.now() >= expires_in){
        res.redirect("http://202.61.201.124:23456/auth/");
        return;
    }
    
    /*const guilds_response = await fetch('https://discord.com/api/users/@me/guilds', {
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
    }*/
})

export default router;