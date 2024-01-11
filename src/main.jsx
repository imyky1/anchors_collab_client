import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import AuthState from "./Contexts/AuthState.jsx";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <Auth0Provider
  //   domain="dev-tzxz44550xpmv47h.us.auth0.com"
  //   clientId="j4cXYterSM58V3iUqzMBxbWXVVHuJxMI"
  //   authorizationParams={{
  //     redirect_uri: window.location.origin,
  //   }}
  // >
    <CookiesProvider>
      <BrowserRouter>
        <AuthState>
          <App />
        </AuthState>
      </BrowserRouter>
    </CookiesProvider>
  // </Auth0Provider>
);
