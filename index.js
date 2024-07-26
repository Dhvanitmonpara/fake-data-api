import express from 'express';
import { app } from "./app.js"
import connectDB from "./db/index.js"
import dotenv from "dotenv"

app.use(express.json());
const port = process.env.PORT || 8000

dotenv.config({
    path: './.env'
})

app.listen(port, ()=>{
    console.log(`server is listening to port ${port}`)
})