import React from "react";
import { useNavigate } from "react-router";

import { useLogout } from "../../../../hooks/useLogout";

// Styles
import styles from "./dropdownCard.module.css";

import Cookies from "js-cookie";

// MUI icons
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";


const DropdownCard = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const handleLogout = () => {

    logout()
    // alert('Logged out');
    navigate('/admin-login')

  }

  return (
    <div className={styles.dropdownCard}>
      <ul className={styles.ul}>
        <li className={styles.li} onClick={() => navigate("dashboard")}>
          <span className={styles.liContainer}>
            {/* Icon */}
            <PersonOutlineOutlinedIcon />
            {/* Display name when expanded */}
            <span className={styles.span}>Profile</span>
          </span>
        </li>
        <li className={styles.li} onClick={handleLogout}>
          <span className={styles.liContainer}>
            <LogoutIcon />
            <span className={styles.span} style={{ whiteSpace: "nowrap" }}>
              Log out
            </span>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default DropdownCard;
