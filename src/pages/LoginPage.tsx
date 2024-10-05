import React from "react";
import { useLocation } from "react-router-dom";
import loginImgBg from "../assets/LoginImg/LoginPageBg.svg";
import Login from "../components/Login/LoginHeader";
import Carousel from "../components/Login/Carousel";
import LoginForm from "../components/Login/LoginForm";
import ResetPassword from "../components/Login/ResetPassword"; // Ensure you import the ResetPassword component

const LoginPage = () => {
  const location = useLocation();

  // Check if the current URL path is for reset password
  const isResettingPassword = location.pathname === "/reset-password";

  return (
    <div
      className="h-screen bg-[#FAFAFA]"
      style={{
        backgroundImage: `url(${loginImgBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
      }}
    >
      <Login />
      <div className="flex justify-center items-center">
        <Carousel />
        {isResettingPassword ? <ResetPassword /> : <LoginForm />}
      </div>
    </div>
  );
};

export default LoginPage;
