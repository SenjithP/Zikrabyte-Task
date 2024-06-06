import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/login-image.jpg";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
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
        "http://localhost:8080/api/users/login",
        {
          userEmail,
          userPassword,
        }
      );
      if (response.data) {
        setUserEmail("");
        setUserPassword("");
        setError(null);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userId: response.data.userId,
            userName: response.data.userName,
            userEmail: response.data.userEmail,
          })
        );
        navigate("/userHome");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "There was an error logging in."
      );
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="login-card">
          <div className="login-left-side">
            <img src={loginImage} alt="Login" className="login-image" />
          </div>
          <div className="login-right-side">
            <form onSubmit={submitHandler}>
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
              <button type="submit">Login Now</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p>
              Don't have an account yet?{" "}
              <span onClick={() => navigate("/userRegister")}>
                Register here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
