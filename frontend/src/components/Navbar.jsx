import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/components/NavbarStyles.css"

const Navbar = () => {

  const currentUser = localStorage.getItem("user");

  return (
    <div className="navbar-container">
      <Link className='navLink' to={"/"}>Home</Link>
      <Link className='navLink' to={"/about"}>About</Link>
      <Link className='navLink' to={"/contact"}>Contact</Link>
      <Link className='navLink' to={"/services"}>Services</Link>
      {currentUser == null ? <Link className='navLink' to={"/netbanking"}>Netbanking</Link> : <Link className='navLink' to={"/dashboard"}>Dashboard</Link>}
      
    </div>
  )
}

export default Navbar;