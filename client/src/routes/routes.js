import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import App from "../App";

// Admin Pages
import AdminLogin from "../Pages/Admin/loginPage/adminLogin";
import LandingPage from "../Pages/Admin/landingPage/landingPage";
import LecHome from "../Pages/Lecturer/lecHome";
import LectureLogin from "../Pages/Lecturer/Login/LectureLogin";

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Unprotected Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/lec-login" element={<LectureLogin/>}/>

        {/* Protected Routes */}
        <Route path="/" element={<App />}>
          <Route path="/admin/*" element={<LandingPage />} />
          <Route path="/lecture/*" element={<LecHome/>}/>
        </Route>
        
      </Routes>
    </Router>
  );
};

export default AllRoutes;
