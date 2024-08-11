import React, { useEffect } from "react";
import loginImgBg from "../assets/LoginPageBg.svg";
import { useDispatch } from "react-redux";
import { getLoginData } from "../redux/slice/login/loginSlice";
const LoginPage = () => {
  console.log(loginImgBg);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getLoginData());
  }, [0]);

  return (
    <div
      className="h-screen bg-[#FAFAFA]"
      style={{
        backgroundImage: `url(${loginImgBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
      }}
    >
      LoginPage
    </div>
  );
};

export default LoginPage;
