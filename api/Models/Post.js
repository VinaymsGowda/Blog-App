import mongoose, { Schema } from "mongoose";

const PostSchema=mongoose.Schema({
    title:String,
    summary:String,
    content:String,
    file:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
    }
},{
    timestamps:true,
});

export const PostModel=mongoose.model('Post',PostSchema);
