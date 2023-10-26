import { Router } from "express";
import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import { UserModel } from "../Models/User.js";
import { PostModel } from "../Models/Post.js";
import fs from "fs";
import  jwt  from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret=process.env.JWT_SECRET;
const uploadMiddleware=multer({dest:'uploads/'});

const router=express.Router();

router.get('/',async(req,res)=>{
    const posts=await PostModel.find()
    .populate('author',['username'])
    .sort({createdAt:-1})
    .limit(20);
    res.json(posts);
});

router.get('/:id',async (req,res)=>{
    const {id}=req.params;
    const postdoc=await PostModel.findById(id).populate('author',['username']);
    res.json(postdoc);
})

router.put('/',uploadMiddleware.single('file'),async (req,res)=>{
    let newpath=null;
    if(req.file){
    const {originalname,path}=req.file;
    const parts=originalname.split('.');
    const ext=parts[parts.length-1];
    newpath=path+'.'+ext;
    fs.renameSync(path,newpath);
    }
        const {id,title,summary,content}=req.body;
        const postdoc=await PostModel.findById(id);
        await PostModel.updateOne({_id:postdoc._id},{
            title,
            summary,
            content,
            file:newpath?newpath:postdoc.file,
        })
      res.json(postdoc);
});




router.post('/',uploadMiddleware.single('file'),async (req,res)=>{
    const {originalname,path}=req.file;
    const parts=originalname.split('.');
    const ext=parts[parts.length-1];
    const newpath=path+'.'+ext;
    fs.renameSync(path,newpath);
    const {token}=req.cookies;
    jwt.verify(token,secret,{},async (err,info)=>{
        if(err) throw err;
        const {title,summary,content}=req.body;
        const newpost=await PostModel.create({
        title,
        summary,
        content,
        file:newpath,
        author:info.id,
    });
    res.json(newpost);  
    });
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params; 
    try {
        await PostModel.findByIdAndDelete(id);
        res.json("Post deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(404).json("Post Not Found");
    }
});


export default router;