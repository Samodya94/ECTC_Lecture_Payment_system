import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import App from "../App";

// Admin Pages
import AdminLogin from "../Pages/Admin/loginPage/adminLogin";
import LandingPage from "../Pages/Admin/landingPage/landingPage";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Unprotected Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Routes */}
        <Route path="/" element={<App />}>
          <Route path="/admin/*" element={<LandingPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AllRoutes;
