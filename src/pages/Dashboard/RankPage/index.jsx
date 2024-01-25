import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthState from "../../../Contexts/AuthState";
import { AuthContext } from "../../../Contexts/AuthState";
import LoaderOne from "../../../Components/Loaders/Loader";
import mixpanel from "mixpanel-browser";
import "./rankPage.css";

export const RankPage = () => {
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 798);
  const { loggedUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {isLoading && <LoaderOne />}

      <div className="container">
        <header className="header">
          <div className="logo">
            <img
              onClick={() => {
                navigate("/");
              }}
              src="/image 5.png"
              alt=""
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
            className="rank_page_profile"
          >
            {loggedUser?.name} <img src={loggedUser?.profile} alt="" />
          </div>
        </header>
        <div className="backgroundImage"></div>
        <div className="rank_page_content">
          <h1>{`Congrats ${loggedUser?.name}!`}</h1>
          <h2>{`You ranked #${23}`}</h2>
          <h3>
            As promised, 100% off & Early Access awaits... <br /> Don't miss out! Grab
            this golden opportunity.
          </h3>

          <div className="rank_page_referral_code">
            Coupon Code : <b> REFERRALVIP100 </b>
          </div>
          <h4>Expires on Jan 31, 2024</h4>
          <button>Claim Your Reward →</button>
        </div>
      </div>
    </>
  );
};
