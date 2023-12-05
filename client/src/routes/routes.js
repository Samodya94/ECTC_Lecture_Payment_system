import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useLecAuthContext } from "../hooks/useLecAuthContext";

// Components
import App from "../App";

// Admin Pages
import AdminLogin from "../Pages/Admin/loginPage/adminLogin";
import LandingPage from "../Pages/Admin/landingPage/landingPage";
import LecHome from "../Pages/Lecturer/lecHome";
import LectureLogin from "../Pages/Lecturer/Login/LectureLogin";


const AllRoutes = () => {

  const {lecturer} = useLecAuthContext();
  return (
    <Router>
      <Routes>
        {/* Unprotected Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/lec-login" element={!lecturer ? <LectureLogin/> : <Navigate to="/lecture"/>}/>
        
        {/* Protected Routes */}
        <Route path="/" element={<App />}>
          <Route path="/admin/*" element={<LandingPage />} />
          <Route path="/lecture/*" element={lecturer ? <LecHome/> : <Navigate to="/lec-login"/>}/>
        </Route>
        
      </Routes>
    </Router>
  );
};

export default AllRoutes;
