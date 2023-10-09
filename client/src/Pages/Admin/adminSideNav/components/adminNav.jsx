import { React, useState, useEffect } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import styles from "../adminSideNav.module.css";

// MUI icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LaptopOutlinedIcon from "@mui/icons-material/LaptopOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

const AdminNav = ({ expanded, setExpanded }) => {
  const [profileExpanded, setProfileExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) {
      setProfileExpanded(false);
    }
  }, [expanded]);

  const toggleProfile = () => {
    if (!expanded) {
      setExpanded(!expanded);
    }
    setProfileExpanded(!profileExpanded);
  };

  return (
    <>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <span className={styles.liContainer}>
            {/* Icon */}
            <HomeOutlinedIcon />
            {/* Display name when expanded */}
            {expanded && <span className={styles.span}>Home</span>}
          </span>
        </li>
        <li className={styles.li}>
          <span className={styles.liContainer}>
            <LaptopOutlinedIcon />
            {expanded ? (
              <span className={styles.span} style={{ whiteSpace: "nowrap" }}>
                Approve Lecture Coverages
              </span>
            ) : null}
          </span>
        </li>
        <li className={styles.li} onClick={toggleProfile}>
          <span className={styles.liContainer}>
            <AdminPanelSettingsOutlinedIcon />
            {expanded && <span className={styles.span}>Configurations</span>}
          </span>
          {profileExpanded
            ? expanded && <span className={styles.span}>&#9650;</span>
            : expanded && <span className={styles.span}>&#9660;</span>}
        </li>
        {/* Sub-links for configurations */}
        {profileExpanded && (
          <ul className={`${styles.subMenu}`}>
            <li className={styles.li} style={{ whiteSpace: "nowrap" }}>
              - Manage Courses
            </li>
            <li className={styles.li} style={{ whiteSpace: "nowrap" }}>
              - Manage Lecturers
            </li>
            <li className={styles.li} style={{ whiteSpace: "nowrap" }}>
              - Manage Batches
            </li>
            <li className={styles.li} style={{ whiteSpace: "nowrap" }}>
              - Manage Students
            </li>
            <li className={styles.li} style={{ whiteSpace: "nowrap" }}>
              - Manage Branches
            </li>
            <li className={styles.li} style={{ whiteSpace: "nowrap" }}>
              - Manage Users
            </li>
          </ul>
        )}
        <li className={styles.li}>
          <span className={styles.liContainer}>
            <PersonOutlineOutlinedIcon />
            {expanded && <span className={styles.span}>View Logins</span>}
          </span>
        </li>
      </ul>
    </>
  );
};

export default AdminNav;
