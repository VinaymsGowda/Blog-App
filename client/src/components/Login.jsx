import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export const Login = () => {
  const [username,setusername]=useState("");
  const [password,setpassword]=useState("");
  const navigate = useNavigate();
  const {setuserinfo}=useContext(UserContext);
  function handleusername(event){
    setusername(event.target.value);
}
function handlepassword(event){
    setpassword(event.target.value);
}

async function login(event){
  event.preventDefault();
  const response=await fetch("https://blog-app-q68u.onrender.com/login",{
    method:'POST',
    body:JSON.stringify({username,password}),
    headers:{'Content-Type':'application/json'},
    credentials:'include',
  });

  if(response.ok){
    response.json().then(userdata=>{
      setuserinfo(userdata);
      navigate('/');
    })
  }
  else{
    alert("Wrong Credentials");
  }
  
  // console.log(response);
}


  return (
    <div>
        <form onSubmit={login}>
    <h1 class="h3 mb-3 fw-normal">Login Page</h1>

    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="Username" value={username} onChange={handleusername}/>
      <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" value={password} placeholder="Password" onChange={handlepassword}/>
      <label for="floatingPassword">Password</label>
    </div>

    <div class="form-check text-start my-3">
      <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
      <label class="form-check-label" for="flexCheckDefault">
        Remember me
      </label>
    </div>
    <button class="btn btn-primary w-100 py-2">Login</button>
  </form>
    </div>
  );
}
