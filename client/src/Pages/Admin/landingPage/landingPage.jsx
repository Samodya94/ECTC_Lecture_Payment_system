import { React, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Styles
import styles from "./landingPage.module.css";

import Header from "../adminHeader/header";
import AdminSideNav from "../adminSideNav/adminSideNav";
import AdminDashboard from "../adminDashboard/adminDashboard";

// User Level == admin routes
import ApproveLectures from "../admin-panel/approveLecturesAdmin/approveLectures";
import ManageCourses from "../admin-panel/manageCoursesAdmin/manageCourses";

const LandingPage = () => {
  const [expanded, setExpanded] = useState(true);
  const userLevel = "admin";

  return (
    <div className={styles.container}>
      <AdminSideNav
        userLevel={userLevel}
        expanded={expanded}
        setExpanded={setExpanded}
      />

      <div className={styles.subContainer}>
        <Header expanded={expanded} setExpanded={setExpanded} />
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center mt-5">
                <h1>Select the page you want to access!</h1>
                <p>Use the right side nav</p>
              </div>
            }
          />

          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="approve-lectures" element={<ApproveLectures />} />
          <Route path="manage-courses" element={<ManageCourses />} />
        </Routes>
      </div>
    </div>
  );
};

export default LandingPage;
