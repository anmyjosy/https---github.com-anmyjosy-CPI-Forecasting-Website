import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://cpiforecast-backend.onrender.com/login', { email, password }, { withCredentials: true })
      .then(result => {
        console.log(result);
        if (result.data === "no record existed") {
          alert("No record existed");
        } else if (result.data === "password is incorrect") {
          alert("Password is incorrect");
        } else if (result.data === "success") {
          navigate('/cpi');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='bg'>
      <div className='logborder'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className='emailenter'>
            <input
              type='text'
              placeholder='Email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='emailenter'>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type='submit'>Login</button>
          </div>
        </form>
        <div className='registerlink'>
          <span>New Here? <u><a href='register' className='reglink'>Create an Account</a></u></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
