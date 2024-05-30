import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-scroll'

const Navbar = () => {
  return (
    <nav className='container'>
      <img src={logo} alt="" className='logo'/>
      <ul>
        <li><a href='/'>Home</a></li>
        <li><a href='about'>About</a></li>
        <button className='loginbut'><a href='login'>LOGIN</a></button>
      </ul>
    </nav>
  )
}

export default Navbar
