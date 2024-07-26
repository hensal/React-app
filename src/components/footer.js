// Footer.js
import React from 'react';
import { FaFacebook, FaTwitter, FaGithub, FaGoogle } from 'react-icons/fa';
import './footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="social-icons">
          <FaFacebook className="social-icon" />
          <FaTwitter className="social-icon" />
          <FaGithub className="social-icon" />
          <FaGoogle className="social-icon" />
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2024 Your Website. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
