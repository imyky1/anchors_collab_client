import React, { useContext, useEffect, useState } from "react";
import LoaderOne from "../Components/Loaders/Loader";
import { AuthContext } from "../Contexts/AuthState";

const Check = () => {
  const params = new URLSearchParams(window.location.search);

  const { linkedinLogin } = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem("jwtToken") && params.get("token")) {
      linkedinLogin(params.get("token"))
    }
  }, []);

  return <><LoaderOne/></>
};

export default Check;
