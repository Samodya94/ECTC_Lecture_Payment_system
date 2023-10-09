import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import App from "../App";

// Admin Pages
import AdminLogin from "../Pages/Admin/loginPage/adminLogin";
import AdminDashboard from "../Pages/Admin/adminDashboard/adminDashboard";

import AdminLandingPage from "../Pages/Admin/adminLandingPage/adminLandingPage";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Unprotected Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Routes */}
        <Route path="/" element={<App />}>
          <Route path="/admin/*" element={<AdminLandingPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AllRoutes;
