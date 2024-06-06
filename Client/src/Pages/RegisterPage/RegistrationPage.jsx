import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import registerImage from "../../assets/register-image.jpg";
import axios from "axios";
import "./RegistrationPage.css";

const RegistrationPage = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      navigate("/userHome");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        {
          userName,
          userEmail,
          userPassword,
        }
      );
      if (response.data) {
        setUserName("");
        setUserEmail("");
        setUserPassword("");
        setError(null);
        navigate("/userLogin");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "There was an error registering the user."
      );
    }
  };

  return (
    <div className="container">
      <div className="register-container">
        <div className="register-card">
          <div className="register-left-side">
            <img
              src={registerImage}
              alt="Register"
              className="register-image"
            />
          </div>
          <div className="register-right-side">
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Enter Your Name"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Enter Your Email"
                name="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter Your Password"
                name="userPassword"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <button type="submit">Register Now</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p>
              Have an account already?{" "}
              <span onClick={() => navigate("/userLogin")}>Login here</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
