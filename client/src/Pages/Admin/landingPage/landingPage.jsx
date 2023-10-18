import { React, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Styles
import styles from "./landingPage.module.css";

// Common components for all userLevels
import Header from "../header/header";
import AdminSideNav from "../sidenav/adminSideNav";
import AdminDashboard from "../dashboard/adminDashboard";

// Common components for Admin & Manager
import ManageCourses from "../admin-panel/manageCoursesAdmin/manageCourses";
import ManageLecturers from "../admin-panel/manageLecturersAdmin/manageLecturers";
import ManageBatches from "../admin-panel/manageBatchesAdmin/manageBatches";
import UpdateBatches from "../admin-panel/manageBatchesAdmin/updateBatches";
import AddBranches from "../admin-panel/manageBranchesAdmin/addBranches";

// User Level == admin components
import ApprovePayments from "../admin-panel/approvePaymentsAdmin/approvePayments";
import ManageUsers from "../admin-panel/manageUsersAdmin/manageUsers";

// User Level == manager components
import ApproveLectures from "../manager-panel/approveLecturesManager/approveLectures";
import ApprovedLectures from "../manager-panel/approveLecturesManager/approvedLectures";
import AssignLecturers from "../manager-panel/assignLecturersManager/assignLecturers";
import ViewAssignedLecturers from "../manager-panel/assignLecturersManager/viewAssignedLecturers";

// Common components for Admin & Manager
import ConfirmedPayments from "../accounts-panel/confirmedPayments/confirmedPayments";

// User Level == accounts components
import AddPayments from "../accounts-panel/addPayments/addPayments";
import FinalizedPayments from "../accounts-panel/finalizedPayments/finalizedPayments";

const LandingPage = () => {
  const [expanded, setExpanded] = useState(true);
  // Change the userLevel between 'admin', 'manager', 'accounts', 'finance'
  // to see different side nav links unique to each userLevel
  const userLevel = "accounts";

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
                <p>Use the side nav</p>
              </div>
            }
          />

          {/* Common Routes */}
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* Admin Routes */}
          <Route path="approve-payments" element={<ApprovePayments />} />
          <Route path="manage-courses" element={<ManageCourses />} />
          <Route path="manage-lecturers" element={<ManageLecturers />} />
          <Route path="manage-batches" element={<ManageBatches />} />
          <Route path="manage-batches/update" element={<UpdateBatches />} />
          <Route path="manage-branches" element={<AddBranches />} />
          <Route path="manage-users" element={<ManageUsers />} />

          {/* Manager Routes */}
          <Route path="approve-lectures" element={<ApproveLectures />} />
          <Route path="approved-lectures" element={<ApprovedLectures />} />
          <Route path="assign-batches" element={<AssignLecturers />} />
          <Route
            path="assign-batches/view-assigned"
            element={<ViewAssignedLecturers />}
          />

          {/* Accounts Routes */}
          <Route path="add-payments" element={<AddPayments />} />
          <Route path="confirmed-payments" element={<ConfirmedPayments />} />
          <Route path="finalized-payments" element={<FinalizedPayments />} />
        </Routes>
      </div>
    </div>
  );
};

export default LandingPage;
