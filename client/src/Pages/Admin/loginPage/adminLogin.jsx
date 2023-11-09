import React from "react";
import LoginCard from "./components/loginCard";

import styles from "./adminLogin.module.css";

const AdminLogin = () => {
  return (
    <>
      <div className={styles.container}>
        <LoginCard />
      </div>
    </>
  );
};

export default AdminLogin;
