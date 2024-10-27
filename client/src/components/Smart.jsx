import React from "react";
import "./Hero.css"; // Import the CSS file


const Smart = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
          At HospiHub, our Smart Insights feature harnesses the power of artificial intelligence and machine learning to provide healthcare professionals with actionable data-driven insights. By analyzing vast amounts of medical data, our models can predict patient outcomes, identify potential health risks, and recommend personalized treatment plans. This innovative approach not only enhances clinical decision-making but also improves patient engagement and satisfaction. With Smart Insights, healthcare providers can make informed decisions that lead to better health outcomes, streamline workflows, and ultimately transform the way care is delivered. Experience the future of healthcare with our intelligent analytics, designed to empower medical teams and improve patient care.
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

export default Smart;





