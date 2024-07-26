import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
  
    return (
      <div className="login-page">    {/* to make the login page in the center of the page */}
      <div className="login-container">
      <h2>Welcome to the site!</h2>
        <p>Please register to your account.</p> 
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
            
        </div>
        <button>Register</button>
        <div className="new-users">
        <p>Already a User? <Link to="/login">Login</Link></p>
        </div>
      </div>
        </div>
    );
};

export default Register;