// import axios from "axios";
// import React, { useState } from "react";
// import { toast } from "react-toastify";

// const MessageForm = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [message, setMessage] = useState("");

//   const handleMessage = async (e) => {
//     e.preventDefault();
//     try {
//       await axios
//         .post(
//           "http://localhost:4000/api/v1/message/send",
//           { firstName, lastName, email, phone, message },
//           {
//             withCredentials: true,
//             headers: { "Content-Type": "application/json" },
//           }
//         )
//         .then((res) => {
//           toast.success(res.data.message);
//           setFirstName("");
//           setLastName("");
//           setEmail("");
//           setPhone("");
//           setMessage("");
//         });
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <>
//       <div className="container form-component message-form">
//         <h2>Send Us A Message</h2>
//         <form onSubmit={handleMessage}>
//           <div>
//             <input
//               type="text"
//               placeholder="First Name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Last Name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </div>
//           <div>
//             <input
//               type="text"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Mobile Number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>
//           <textarea
//             rows={7}
//             placeholder="Message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <div style={{ justifyContent: "center", alignItems: "center" }}>
//             <button type="submit">Send</button>
//           </div>
//         </form>
//         <img src="/Vector.png" alt="vector" />
//       </div>
//     </>
//   );
// };

// export default MessageForm;



import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/message/send",
          { firstName, lastName, email, phone, message },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="message-form" style={formContainerStyles}>
        <h2 style={headingStyles}>Send Us A Message</h2>
        <form onSubmit={handleMessage}>
          <div style={formGroupStyles}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={inputStyles}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={inputStyles}
            />
          </div>
          <div style={formGroupStyles}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyles}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyles}
            />
          </div>
          <textarea
            rows={7}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={textareaStyles}
          />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <button type="submit" style={buttonStyles}>Send</button>
          </div>
        </form>
        <img src="/Vector.png" alt="vector" style={imageStyles} />
      </div>
    </>
  );
};

// Inline Styles
const formContainerStyles = {
  maxWidth: "1000px",
  margin: "40px auto",
  padding: "30px",
  background: "#f2f9ff",
  borderRadius: "10px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const headingStyles = {
  fontSize: "1.8rem",
  color: "#305f72",
  marginBottom: "20px",
  fontWeight: "bold",
};

const formGroupStyles = {
  display: "flex",
  gap: "10px",
  marginBottom: "15px",
  justifyContent: "space-between",
};

const inputStyles = {
  width: "100%",
  padding: "12px",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  fontSize: "1rem",
  color: "#333333",
  transition: "border-color 0.3s ease",
};

const textareaStyles = {
  ...inputStyles,
  resize: "vertical",
};

const buttonStyles = {
  width: "100%",


  padding: "10px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#007bff", // Bootstrap primary color
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s",
  marginTop: "10px",
};

const imageStyles = {
  marginTop: "20px",
  maxWidth: "100px",
  opacity: 0.8,
};

// Input focus styles
const focusInputStyles = `
  input:focus, textarea:focus {
    border-color: #ff6f61;
    outline: none;
    box-shadow: 0 0 5px rgba(255, 111, 97, 0.5);
  }

  button:hover {
    background: #ff5a4f;
  }

  @media (max-width: 768px) {
    form div {
      flex-direction: column;
    }
  }
`;

export default MessageForm;

