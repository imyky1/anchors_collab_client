import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo/Index";
import OtpVerify from "./OtpVerify";
import Success from "./Success/Index";
import { AuthContext } from "../../Contexts/AuthState";
import ProtectedRoute from "../../Helpers/ProtectedRoute";
import { RankPage } from "./RankPage";
import AcitvationPage from "./ActivationPage";
import { SmallScreenAlert } from "./SmallScreenAlert";

const Dashboard = () => {
  const {loggedUser} = useContext(AuthContext)
  
  return (
    <>
      <Routes>
          <Route path="*" element={<ProtectedRoute navigateCondition={loggedUser?.firstTime} toUrl={"/dashboard/userinfo"}><Success /></ProtectedRoute> } />
        <Route path="userinfo" element={<ProtectedRoute navigateCondition={!loggedUser?.firstTime} toUrl={"/dashboard"}><UserInfo /></ProtectedRoute>}/>
        <Route path="otp-verify" element={<OtpVerify />} />
        <Route path="rank_page" element={<RankPage />} />
        <Route path="activation_page" element={<AcitvationPage />} />
        <Route path="small_screen_alert" element={<SmallScreenAlert />} />

      </Routes>
    </>
  );
};

export default Dashboard;
