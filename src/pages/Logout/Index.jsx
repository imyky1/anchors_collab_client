import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Loader.css"
import mixpanel from "mixpanel-browser";

function Index() {
  const navigate = useNavigate();

  const [openModel, setopenModel] = useState(true);

  const logout = () => {
    localStorage.removeItem("jwtToken");
    mixpanel.reset();
    window.open("/");
  };

  if (!openModel) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div onClick={() => setopenModel(false)} className="logout_model_logout">
      <div onClick={(e) => e.stopPropagation()} className="model_main_box">
        <span className="model_question">Do You Really Want to Log Out?</span>
        <span className="model_gyan">
          Logging out now will require you to log in again next time you visit.
        </span>
        <div className="model_buttons">
          <button className="model_button" onClick={() => setopenModel(false)}>
            Cancel
          </button>
          <button className="model_button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Index;
