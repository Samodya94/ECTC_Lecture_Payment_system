import { React, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Styles
import styles from "./adminLandingPage.module.css";

import Header from "../adminHeader/header";
import AdminSideNav from "../adminSideNav/adminSideNav";
import AdminDashboard from "../adminDashboard/adminDashboard";

const AdminLandingPage = () => {
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
        </Routes>
      </div>
    </div>
  );
};

export default AdminLandingPage;
