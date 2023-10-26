import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { UserModel } from "./Models/User.js";
import { PostModel } from "./Models/Post.js";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import router from "./Routes/Post.js";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
const uploadMiddleware=multer({dest:'uploads/'});
const app=express();

const salt=bcrypt.genSaltSync(10);
const secret=process.env.JWT_SECRET;
const dbpass=process.env.password;
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
const __dirname=dirname(fileURLToPath(import.meta.url));
app.use('/uploads',express.static(__dirname+'/uploads'));
app.use('/post',router);

app.get("/",(req,res)=>{
    res.send("<h1> Hello World </h1>");
});

const port=4000;

app.post("/register",async (req,res)=>{
    try {
        const {username,password}=req.body;
        console.log(username);
        console.log(password);
            const userdoc=await UserModel.create({
                username,
                password:bcrypt.hashSync(password,salt),
            });
            res.json(userdoc);
    }  catch (error) {
        console.log(error);
        res.status(400).json("Bad Request");
    }

});

app.post("/login",async (req,res)=>{
    try {
        const {username,password}=req.body;
        console.log(username);
        const userdoc= await UserModel.findOne({username});
        const passok=bcrypt.compareSync(password,userdoc.password);
        if(passok){
            const payload={username,id:userdoc._id}
            jwt.sign(payload,secret,{},(err,token)=>{
                if(err)
                    throw err;
                res.cookie('token',token).json({
                    id:userdoc._id,
                    username,
                });
            })
        }
        else{
            res.status(400).json("Wrong Crendentials");
        }
    } catch (error) {
        console.log("Username not found");
        console.log(error);
        res.status(400).json("Bad Request");
    }

})

app.get("/profile",(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
        if(err) throw err;
        res.json(info);
    });
});

app.post("/logout", (req, res) => {
    res.clearCookie('token').json('Logged out successfully');
});


mongoose.connect(`mongodb+srv://vinaymsgowda27:${dbpass}@blog-apps.qjpowm0.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`).
then(app.listen(port,()=>{
    console.log("Connected to Database");
    console.log("Server Listening on port "+port);
}))
.catch((err)=>{
    console.log("Not connected to server");
});