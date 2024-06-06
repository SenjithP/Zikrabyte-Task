import React, { useEffect, useState } from "react";
import axios from "axios";
import welcomeImage from "../../assets/welcome-image.jpg";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setUserName(userData.userName);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/users/logout");
      localStorage.removeItem("userData");
      navigate("/userLogin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="container">
      <div className="welcome-container">
        <img src={welcomeImage} alt="Welcome" className="welcome-image" />
        <div className="welcome-text">
          <p>
            Welcome <span className="userName">{userName}</span> to Zikrabyte
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
