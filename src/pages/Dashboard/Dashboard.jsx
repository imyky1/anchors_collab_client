import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo/Index";
import OtpVerify from "./OtpVerify";
import Success from "./Success/Index";
import { AuthContext } from "../../Contexts/AuthState";

const Dashboard = () => {
  const {loggedUser} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if(loggedUser?.firstTime){
      navigate("/dashboard/userinfo")
    }
  }, [loggedUser?.firstTime])
  
  return (
    <>
      <Routes>
        <Route path="*" element={<Success />} />
        <Route path="userinfo" element={<UserInfo />} />
        <Route path="otp-verify" element={<OtpVerify />} />
      </Routes>
    </>
  );
};

export default Dashboard;
