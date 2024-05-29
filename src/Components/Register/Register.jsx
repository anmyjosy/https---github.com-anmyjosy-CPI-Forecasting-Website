import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [purpose, setPurpose] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Invalid email id');
      return;
    } else {
      setEmailError('');
    }

    axios.post('https://https-github-com-anmyjosy-cpi.onrender.com/register', { name, email, password, role, purpose })
      .then(response => {
        if (response.data.message === "user already existed") {
          alert('User already existed');
        } else if (response.data.status) {
          navigate('/login');
          alert('Registered Successfully');
        } 
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='bg'>
      <div className='logborder'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className='emailenter'>
            <input
              type='text'
              spellCheck='false'
              id='email-field'
              placeholder='Email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <span className='error' id='email-error'>{emailError}</span>}
          </div>
          <div className='emailenter'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='emailenter'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='emailenter'>
            <input
              type='text'
              placeholder='Role'
              name='role'
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <div className='emailenter'>
            <input
              type='text'
              placeholder='Purpose'
              name='purpose'
              onChange={(e) => setPurpose(e.target.value)}
              required
            />
          </div>
          <div>
            <button type='submit'>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
