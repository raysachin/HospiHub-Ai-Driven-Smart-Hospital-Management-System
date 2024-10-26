import React from "react";
import "./Biography.css"; // Import the CSS file

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" className="biography-image" />
        </div>
        <div className="banner">
          <h3>Who We Are: Our Mission and Vision</h3>
          <p>
            At HospiHub, we are a dedicated team of healthcare professionals, technology enthusiasts, and innovators committed to transforming the healthcare landscape. Our mission is to streamline hospital management through advanced technology, ensuring that both patients and providers have a seamless experience. With a passion for improving healthcare outcomes, we combine our expertise in healthcare systems, data analytics, and machine learning to develop solutions that empower medical professionals and enhance patient care. Our vision is to create a connected healthcare ecosystem where efficient communication and data-driven insights lead to better health outcomes for everyone. Together, we are reshaping the future of healthcare, one innovation at a time.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;







