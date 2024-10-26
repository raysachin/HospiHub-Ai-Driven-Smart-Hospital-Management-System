import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    { id: 1, day: "Monday", time: "9:00 AM - 11:00 PM" },
    { id: 2, day: "Tuesday", time: "12:00 PM - 12:00 AM" },
    { id: 3, day: "Wednesday", time: "10:00 AM - 10:00 PM" },
    { id: 4, day: "Thursday", time: "9:00 AM - 9:00 PM" },
    { id: 5, day: "Friday", time: "3:00 PM - 9:00 PM" },
    { id: 6, day: "Saturday", time: "9:00 AM - 3:00 PM" },
  ];

  return (
    <>
      <footer className="footer-container" style={footerContainerStyles}>
        <hr style={hrStyles} />
        <div className="footer-content" style={contentStyles}>
          <div style={sectionStyles}>
            <img src="/logo.png" alt="logo" className="logo-img" style={logoStyles} />
          </div>
          <div style={sectionStyles}>
            <h4 style={headingStyles}>Quick Links</h4>
            <ul style={linkListStyles}>
              <li><Link to="/" style={linkStyles}>Home</Link></li>
              <li><Link to="/appointment" style={linkStyles}>Appointment</Link></li>
              <li><Link to="/about" style={linkStyles}>About</Link></li>
            </ul>
          </div>
          <div style={sectionStyles}>
            <h4 style={headingStyles}>Hours</h4>
            <ul style={hoursListStyles}>
              {hours.map((element) => (
                <li key={element.id} style={hoursItemStyles}>
                  <span style={dayStyles}>{element.day}:</span>
                  <span style={timeStyles}>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={sectionStyles}>
            <h4 style={headingStyles}>Contact</h4>
            <div style={contactItemStyles}>
              <FaPhone style={iconStyles} />
              <span style={contactTextStyles}>999-999-9999</span>
            </div>
            <div style={contactItemStyles}>
              <MdEmail style={iconStyles} />
              <span style={contactTextStyles}>hospihub@gmail.com</span>
            </div>
            <div style={contactItemStyles}>
              <FaLocationArrow style={iconStyles} />
              <span style={contactTextStyles}>Delhi, India</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

// Inline Styles
const footerContainerStyles = {
  padding: "20px",
  backgroundColor: "#282c34",
  color: "#ffffff",
  fontSize: "14px",
  textAlign: "center",
};

const hrStyles = {
  borderColor: "#444",
  margin: "20px 0",
};

const contentStyles = {
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  gap: "20px",
};

const sectionStyles = {
  flex: "1 1 200px",
  minWidth: "200px",
};

const logoStyles = {
  maxWidth: "150px",
  marginBottom: "10px",
};

const headingStyles = {
  fontSize: "16px",
  color: "#ff6f61",
  marginBottom: "10px",
};

const linkListStyles = {
  listStyle: "none",
  padding: 0,
};

const linkStyles = {
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "14px",
  display: "block",
  marginBottom: "5px",
};

const hoursListStyles = {
  listStyle: "none",
  padding: 0,
};

const hoursItemStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "5px",
  color: "#ddd",
};

const dayStyles = {
  fontWeight: "bold",
};

const timeStyles = {
  color: "#aaaaaa",
};

const contactItemStyles = {
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
  gap: "10px",
};

const iconStyles = {
  fontSize: "18px",
  color: "#ff6f61",
};

const contactTextStyles = {
  fontSize: "14px",
};

export default Footer;










