import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

function Heading(){
  const {setuserinfo,userinfo}=useContext(UserContext);
  
  useEffect(()=>{
    fetch("http://localhost:4000/profile",{
      credentials:'include',
    }).then(response=>{
      response.json().then(userdata=>{
      setuserinfo(userdata);
      });
    });
  },[]);

  //invalidate cookie here
  function logout(){
    fetch("http://localhost:4000/logout",{
      credentials:'include',
      method:'POST',
    });
    setuserinfo(null);
  }

  const username=userinfo?.username;
  return (
    <header>
        <Link to="/" className="logo">Welcome to Blog Application</Link>
        <nav>
        {username && (
          <>
            <Link to="/" style={{fontWeight:'bold',color:'black'}}>Hello @{username}</Link>
            <Link to="/create">Create new Post</Link>
            <Link onClick={logout}>Logout</Link>
          </>
        )}
        {!username && (
          <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
          </>
        )}
        
        </nav>
      </header>
  );
}

export default Heading;
