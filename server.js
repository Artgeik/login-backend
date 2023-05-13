const express= require("express");
const http = require("http");
const cors = require("cors");
const Joi = require("joi");
const config= process.env;
require('dotenv').config();
const validator=require("express-joi-validation").createValidator({});
const PORT = process.env.PORT||3002;
const {addUser,checkUser} = require("./users");

const app=express()
const server = http.createServer(app);
app.use(express.json());
app.use(cors({origin:"*"}));

const regSchema = Joi.object({
    name:Joi.string().min(3).max(12).required(),
    password:Joi.string().min(8).required().pattern(RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")),
    mail:Joi.string().email().required(),
    age:Joi.number().min(18).max(90).required(),
});

const logSchema = Joi.object({
    mail:Joi.string().email().required(),
    password:Joi.string().required().min(8).pattern(RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"))
});


app.post("/register",validator.body(regSchema),(req,res)=>{
    res.json(addUser(req.body.mail,req.body.password));
});

app.post("/login",validator.body(logSchema),(req,res)=>{
    res.json(checkUser(req.body.mail,req.body.password));
});

app.get('/',(req,res)=>{
    res.json({response:"its been hit"});
});

server.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`);
});