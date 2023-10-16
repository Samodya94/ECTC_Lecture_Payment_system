import React from "react";
import { useNavigate } from "react-router";

// Styles
import styles from "./dropdownCard.module.css";

// MUI icons
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

const DropdownCard = () => {
  const navigate = useNavigate();

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
        <li className={styles.li} onClick={() => navigate("approve-lectures")}>
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
