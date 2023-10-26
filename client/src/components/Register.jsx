import React, { useState } from 'react'

export const Register = () => {

    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    function handleusername(event){
        setusername(event.target.value);
    }
    function handlepassword(event){
        setpassword(event.target.value);
    }

    async function register(event){
        event.preventDefault();

      
      const response=  await fetch('http://localhost:4000/register',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
        });

        if(response.status!==200){
          alert("Username already exists");
        }
        else{
          alert("Registration Successful");
        }
    }
  return (
    <div>
        <form onSubmit={register}>
    <h1 class="h3 mb-3 fw-normal">Register Page</h1>
    <div class="form-floating">
      <input type="text" class="form-control" id="floatingInput" placeholder="Username" value={username} onChange={handleusername}/>
      <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={handlepassword}/>
      <label for="floatingPassword">Password</label>
    </div>

    <div class="form-check text-start my-3">
      <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
      <label class="form-check-label" for="flexCheckDefault">
        Remember me
      </label>
    </div>
    <button class="btn btn-primary w-100 py-2">Sign up</button>
  </form>
    </div>
  );
}
