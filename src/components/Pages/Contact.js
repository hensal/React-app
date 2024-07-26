// Contact.js
import React from 'react';
import './Contact.css'; // Import the CSS file for styling

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact Page</h2>
      <p>Welcome to our Contact page. Feel free to reach out to us using the information below:</p>

      <div className="contact-info">
        <h3>Contact Information</h3>
        <p>Email: contact@example.com</p>
        <p>Phone: +123 456 7890</p>
        {/* Add more contact information as needed */}
      </div>

      <div className="contact-form">
        <h3>Contact Form</h3>
        {/* Your contact form component goes here */}
        {/* You can use form libraries like Formik or build your custom form */}
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4"></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
