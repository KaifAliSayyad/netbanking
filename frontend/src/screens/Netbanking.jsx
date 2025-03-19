import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import "../styles/screens/NetbankingStyles.css"

const Netbanking = () => {

  const [isLogin, setIsLogin] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser != null) {
      navigate('/dashboard')
    }
  }, [])

  const toggleLogin = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="netbanking-container">
      {isLogin ? <Login toggleLogin={toggleLogin}/> : <Register toggleLogin={toggleLogin}/>}
    </div>
  )
}

export default Netbanking