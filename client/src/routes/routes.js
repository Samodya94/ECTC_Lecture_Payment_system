import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useLecAuthContext } from "../hooks/useLecAuthContext";
import { useAuthContext } from "../hooks/useAuthContext";

// Components
import App from "../App";

// Admin Pages
import AdminLogin from "../Pages/Admin/loginPage/adminLogin";
import LandingPage from "../Pages/Admin/landingPage/landingPage";
import LecHome from "../Pages/Lecturer/lecHome";
import LectureLogin from "../Pages/Lecturer/Login/LectureLogin";


const AllRoutes = () => {

  const { lecturer } = useLecAuthContext();
  const { user } = useAuthContext();

  return (
    <Router>
      <Routes>
        {/* Unprotected Routes */}
        <Route path="/" element={!user ? <AdminLogin /> : <Navigate to="/admin/dashboard" />} />
        <Route path="/lec-login" element={!lecturer ? <LectureLogin /> : <Navigate to="/lecture" />} />

        {/* Protected Routes */}
        <Route path="/" element={<App />}>
          <Route path="/admin/*" element={user ? <LandingPage /> : <AdminLogin />} />
          <Route path="/lecture/*" element={lecturer ? <LecHome /> : <Navigate to="/lec-login" />} />
        </Route>

      </Routes>
    </Router>
  );
};

export default AllRoutes;
