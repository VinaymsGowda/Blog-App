import React from 'react'
import {format} from "date-fns"
import {Link} from "react-router-dom";

export default function Post(props){
  return (
    <div className="post">
        <div className="image">
        <Link to={`/post/${props._id}`}>
          <img src={'http://localhost:4000/'+props.file} alt=''/>
          </Link>
        </div>
        
        <div className="text">
        <Link to={`/post/${props._id}`}>
          <h2>{props.title}</h2>
          </Link>
          <p className="info">
            <a className="author">{props.author.username}</a>
            <time>{format(new Date(props.createdAt),'MMM d,yyyy HH:MM')}</time>
          </p>
          <p className="summary">{props.summary}</p>
        </div>
      </div>  
  );
}
