import React from "react";
import "./Hero.css"; // Import the CSS file

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            Welcome to <strong>HospiHub</strong>, your central hub for innovative healthcare management solutions. At HospiHub, we are dedicated to revolutionizing the way hospitals operate, ensuring a seamless and efficient experience for both patients and healthcare providers. Our platform integrates advanced features such as patient record management, appointment scheduling, and real-time communication, all designed to enhance the quality of care. With powerful machine learning capabilities for disease prediction and medical image analysis, HospiHub empowers healthcare professionals with data-driven insights to make informed decisions. Join us in transforming healthcare into a more efficient, patient-centered experience, where compassion meets cutting-edge technology. Discover how HospiHub can streamline hospital operations and improve patient outcomes today!
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;





