import React from 'react'
import "../styles/components/LoginStyles.css";

const Login = ({ toggleLogin }) => {
  return (
    <div className="login-container">
      <div className="login-header">
        <h3>Login</h3>
      </div>
      <div className="login-body">
        <form className='login-form'>
          <input type='text' placeholder='Customer ID' />
          <input type='password' placeholder='Confirm password' />
          <div className="button-group">
            <button>Login</button>
            <button onClick={() => toggleLogin()}>Signup?</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login