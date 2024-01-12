import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo/Index";
import OtpVerify from "./OtpVerify";
import Success from "./Success/Index";
import { AuthContext } from "../../Contexts/AuthState";
import ProtectedRoute from "../../Helpers/ProtectedRoute";

const Dashboard = () => {
  const {loggedUser} = useContext(AuthContext)
  
  return (
    <>
      <Routes>
          <Route path="*" element={<ProtectedRoute navigateCondition={loggedUser?.firstTime} toUrl={"/dashboard/userinfo"}><Success /></ProtectedRoute> } />
        <Route path="userinfo" element={<ProtectedRoute navigateCondition={!loggedUser?.firstTime} toUrl={"/dashboard"}><UserInfo /></ProtectedRoute>}/>
        <Route path="otp-verify" element={<OtpVerify />} />
      </Routes>
    </>
  );
};

export default Dashboard;
