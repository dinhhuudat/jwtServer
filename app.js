require("dotenv").config(); 
const cors=require("cors")
const express = require("express");

const app = express();
app.use(cors({origin:"*"}))


app.use(express.json());

// Logic goes here

module.exports = app;