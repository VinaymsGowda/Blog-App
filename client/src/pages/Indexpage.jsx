import React, { useEffect, useState } from "react";
import Post from "../components/Post";

function IndexPage(){

    const [posts,setposts]=useState([]);
    useEffect(()=>{
        fetch('https://blog-app-q68u.onrender.com/post',{
            method:'GET',
        }).then(response=>{
            response.json().then(posts=>{
                setposts(posts);
            });
        })
    },[]);
    
return(
    <>
        {posts.length>0 && posts.map(post=>(
            <Post {...post}/>
        ))}
    </>
);
    
}

export default IndexPage;