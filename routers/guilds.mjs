import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();


const router = express.Router();

router.get("/", async (req, res) =>{
    if(Object.keys(req.query).length != 0){
        console.log("yes")
        if(req.query.code != undefined && req.query.code != null){
            if(req.cookies.user == undefined || req.cookies.user == null){
                res.redirect("http://202.61.201.124:23456/auth/?code=" + req.query.code);
                return;
            }
        }
    }
    

    console.log(req.quer)

    const access_token = req.cookies.user.split(";")[0];
    const token_type = req.cookies.user.split(";")[1];
    const expires_in = req.cookies.user.split(";")[2];

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