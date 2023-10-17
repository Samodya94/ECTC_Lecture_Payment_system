import React from "react";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "../adminSideNav.module.css";

// MUI icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";

const AccountsNav = ({ expanded }) => {
  const navigate = useNavigate();

  return (
    <>
      <ul className={styles.ul}>
        <li
          className={styles.li}
          style={{ whiteSpace: "nowrap" }}
          onClick={() => navigate("dashboard")}
        >
          <span className={styles.liContainer}>
            {/* Icon */}
            <HomeOutlinedIcon />
            {/* Display name when expanded */}
            {expanded && <span className={styles.span}>Home</span>}
          </span>
        </li>
        <li
          className={styles.li}
          style={{ whiteSpace: "nowrap" }}
          onClick={() => navigate("")}
        >
          <span className={styles.liContainer}>
            {/* Icon */}
            <PaidOutlinedIcon />
            {/* Display name when expanded */}
            {expanded && (
              <span className={styles.span}>Add Lecture Payments</span>
            )}
          </span>
        </li>
        <li
          className={styles.li}
          style={{ whiteSpace: "nowrap" }}
          onClick={() => navigate("")}
        >
          <span className={styles.liContainer}>
            {/* Icon */}
            <AutoStoriesOutlinedIcon />
            {/* Display name when expanded */}
            {expanded && <span className={styles.span}>Approved Lectures</span>}
          </span>
        </li>
        <li
          className={styles.li}
          style={{ whiteSpace: "nowrap" }}
          onClick={() => navigate("")}
        >
          <span className={styles.liContainer}>
            {/* Icon */}
            <CreditScoreOutlinedIcon />
            {/* Display name when expanded */}
            {expanded && (
              <span className={styles.span}>Finalized Payments</span>
            )}
          </span>
        </li>
        <li
          className={styles.li}
          style={{ whiteSpace: "nowrap" }}
          onClick={() => navigate("")}
        >
          <span className={styles.liContainer}>
            {/* Icon */}
            <ReceiptOutlinedIcon />
            {/* Display name when expanded */}
            {expanded && <span className={styles.span}>Payment Records</span>}
          </span>
        </li>
      </ul>
    </>
  );
};

export default AccountsNav;
