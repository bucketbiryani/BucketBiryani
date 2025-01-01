import React from "react";

function Contact() {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p><strong>Address:</strong> 638 Queen St West, Toronto, ON, M6J 1E4</p>
      <p><strong>Phone:</strong> +1 (647) 507-6143</p>
      <p><strong>Email:</strong> bucketbiryani2024@gmail.com</p>
      <p>We would love to hear from you! Feel free to visit us, give us a call, or send us an email.</p>
    
      <h2>Find Us</h2>
      <p>
        Click the button below for directions to our restaurant:
      </p>
      <a
        href="https://maps.app.goo.gl/y4Kec3B1zr7SxHZ9A"
        target="_blank"
        rel="noopener noreferrer"
        className="directions-button"
      >
        Get Directions
      </a>
    </div>
  );
}

export default Contact;
