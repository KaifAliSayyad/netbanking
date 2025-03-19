import React, { useState } from 'react'
import { toast } from 'react-toastify';
import "../styles/components/RegisterStyles.css";
import axios from 'axios';
import { login_user as login } from "../redux/UserAction";
import { useDispatch } from 'react-redux';

const Register = ({ toggleLogin }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(name, email, password, confirmPassword);
    if(password != confirmPassword){
      toast.error("Password and confirm password does not match", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }else{
      axios.post("http://localhost:8080/users",{
        name,
        email,
        password
      }).then((res) => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        dispatch(login(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
        // window.location.reload();
        toast.success("User registered successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }).catch((err) => {
        console.log(err);
        toast.error("User already exists", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
    }
    
  }

  return (
    <div className="register-container">
      <div className="register-header">
        <h3>Register</h3>
      </div>
      <div className="register-body">
        <form className='register-form' onSubmit={(e) => handleRegister(e)}>
          <input type='text' htmlFor="name" placeholder='Enter your name' onChange={(e) => setName(e.target.value)} required/>
          <input type='email' htmlFor="email" placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)} required />
          <input type='text' htmlFor="password" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} required/>
          <input type='password' htmlFor="confirmPassword" placeholder='Confirm password' onChange={(e) => setConfirmPassword(e.target.value)} required/>
          <div className="button-group">
            <button type="submit">Register</button>
            <button onClick={() => toggleLogin()}>Already registered?</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register