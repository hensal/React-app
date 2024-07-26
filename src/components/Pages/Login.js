// Login.js
import React, { useState } from 'react';
import '../Pages/Login.css'; // Import the CSS file for styling
import '../Pages/Register.js'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-page">    {/* to make the login page in the center of the page */}
    <div className="login-container">
    <h2>Welcome to the site!</h2>
      <p>Please Login to your account.</p>
      <div className="login-form">
        <label>Email</label>
        <input type="email" placeholder="Enter your email" />

        <label>Password</label>
        <div className="password-container">
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Enter your password"
          />
          {/* Password toggle */}
          <span
            className="show-password-icons"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? '🙈' : '👁️'}
          </span>
        </div>

        <div className="remember-forgot">
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <span className="forgot-password">Forgot Password</span>
        </div> 

      </div>
      <button>Login</button>
      <div className="new-users">
      <p>New users? <Link to="/register">Create an account</Link></p>
      </div>
    </div>
      </div>
  );
};

export default Login;