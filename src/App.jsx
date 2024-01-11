import Home from "./pages/Home/Index.jsx";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Check from "./pages/Check";
import Logout from "./pages/Logout/Index.jsx";
import { AuthContext } from "./Contexts/AuthState";
import { useContext, useEffect } from "react";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import UserState from "./Contexts/UserState.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Helpers/ProtectedRoute.jsx";
import mixpanel from "mixpanel-browser";

function App() {
  const location = useLocation()
  const { GetUserData,loggedUser } = useContext(AuthContext);

  mixpanel.init(import.meta.env.VITE_MIXPANELTOKEN, { debug: true });

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      GetUserData();
    }
  }, [location]);

  return (
    <>
      <UserState>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute navigateCondition={!localStorage.getItem("jwtToken")} toUrl={"/"}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/check" element={<Check />} />
          <Route path="/logout" element={<ProtectedRoute navigateCondition={!localStorage.getItem("jwtToken")} toUrl={"/"}><Logout /></ProtectedRoute>} />
        </Routes>
      </UserState>

      <ToastContainer theme="dark" limit={1} position="top-center" />
    </>
  );
}

export default App;
