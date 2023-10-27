import React from "react";

// Logo
import logo from "../../../assets/logo.jpg";

// Styles
import styles from "./adminSideNav.module.css";

// Navigation components
import AdminNav from "./components/adminNav";
import ManagerNav from "./components/managerNav";
import FinanceNav from "./components/financeNav";
import AccountsNav from "./components/accountsNav";

const AdminSideNav = ({ userLevel, expanded, setExpanded }) => {
  return (
    <div
      className={`${styles.sideNav} ${
        expanded ? `${styles.expanded}` : `${styles.collapsed}`
      }`}
    >
      {expanded ? (
        <img src={logo} className={styles.logo} alt="ECTC Logo" />
      ) : (
        <div style={{ height: "82.95px" }}></div>
      )}
      {userLevel === "admin" ? (
        <AdminNav expanded={expanded} setExpanded={setExpanded} />
      ) : userLevel === "manager" ? (
        <ManagerNav expanded={expanded} setExpanded={setExpanded} />
      ) : userLevel === "finance" ? (
        <FinanceNav expanded={expanded} setExpanded={setExpanded} />
      ) : userLevel === "accounts" ? (
        <AccountsNav expanded={expanded} setExpanded={setExpanded} />
      ) : null}
    </div>
  );
};

export default AdminSideNav;
