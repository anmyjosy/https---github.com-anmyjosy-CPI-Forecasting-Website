import React from 'react'
import './Login.css'
import { useState} from 'react'
import axios from 'axios'
import { useAuth } from 'C:/Users/asus/Desktop/castfore/AuthContext.jsx';
import{useNavigate} from 'react-router-dom'


function Login(){
  const[email, setEmail]=useState()
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const[password, setPassword]=useState()
  const navigate=useNavigate()
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/login',{email,password})
    .then(result=>{console.log(result)
      setShowPassword(!showPassword);
     if(result.data==="no record existed"){
        alert("no record existed");
      }
    if(result.data==="password is incorrect"){
      alert("password is incorrect");
    }
    if(result.data==="success"){
      setIsAuthenticated(true);
      navigate('/cpi')
    }
  })
    .catch(err=>console.log(err))

  }
  return (
    <div className='bg'>
      <div className='logborder'>
      <h1>Login</h1>
      <div className='emailenter'>
      <input type='text' placeholder='Email' name='email' onChange={(e)=>setEmail(e.target.value)} required/>
      </div>
      <div className='emailenter'>
      <input type={showPassword ? 'text' : 'password'}  placeholder='Password' name='password' onChange={(e)=>setPassword(e.target.value)}required/>
      </div>
      <div>
        <button onClick={handleSubmit}type='submit'>Login</button>
      </div>
      <div className='registerlink'>
        <span>New Here?<u><a href='register' className='reglink'>Create an Account</a></u></span>
      </div>
    </div>
      </div>
  )
}

export default Login
