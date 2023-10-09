import React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import styles from "../adminSideNav.module.css";

const ManagerNav = ({ expanded }) => {
  return (
    <>
      <ul className={styles.ul}>
        <li className={styles.li}>
          {/* Icon */}
          <PersonOutlineOutlinedIcon />
          {/* Display name when expanded */}
          {expanded && <span className={styles.span}>Dashboard</span>}
        </li>
        <li className={styles.li}>
          <PersonOutlineOutlinedIcon />
          {expanded && <span className={styles.span}>Profile</span>}
        </li>
        <li className={styles.li}>
          <PersonOutlineOutlinedIcon />
          {expanded && <span className={styles.span}>Settings</span>}
        </li>
        {/* Add more items as needed */}
      </ul>
    </>
  );
};

export default ManagerNav;
