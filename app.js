import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();

let config = JSON.parse(process.env.MY_SERVER);
app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});