// const express = require('express');
import express from "express";
const app = express();
import dotenv from 'dotenv';

import databaseConnect from './config/database.js'
import authRouter from './routes/authRoute.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import messengerRoute from './routes/messengerRoute.js';

dotenv.config({
     path : 'backend/config/config.env'
})

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/messenger',authRouter);  //here authRouter is file name where remaining url may present therefore using app.use here.
app.use('/api/messenger',messengerRoute);



const PORT = process.env.PORT || 4000
app.get('/', (req, res)=>{
     res.send('This is from backend Sever')
})

databaseConnect();

app.listen(PORT, ()=>{
     console.log(`Server is running on port ${PORT}`)
})