import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "../adminSideNav.module.css";

// MUI icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LaptopOutlinedIcon from "@mui/icons-material/LaptopOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const AdminNav = ({ expanded, setExpanded }) => {
  const [configurationExpanded, setConfigurationExpanded] = useState(false);
  const [loginsExpanded, setLoginsExpanded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!expanded) {
      setConfigurationExpanded(false);
      setLoginsExpanded(false);
    }
  }, [expanded]);

  const toggleConfiguration = () => {
    if (!expanded) {
      setExpanded(!expanded);
    }
    setConfigurationExpanded(!configurationExpanded);
  };

  const toggleLogins = () => {
    if (!expanded) {
      setExpanded(!expanded);
    }
    setLoginsExpanded(!loginsExpanded);
  };

  return (
    <>
      <ul className={styles.ul}>
        <li className={styles.li} onClick={() => navigate("dashboard")}>
          <span className={styles.liContainer}>
            {/* Icon */}
            <HomeOutlinedIcon />
            {/* Display name when expanded */}
            {expanded && <span className={styles.span}>Home</span>}
          </span>
        </li>
        <li className={styles.li} onClick={() => navigate("approve-payments")}>
          <span className={styles.liContainer}>
            <LaptopOutlinedIcon />
            {expanded ? (
              <span className={styles.span} style={{ whiteSpace: "nowrap" }}>
                Approve Lecture Coverages
              </span>
            ) : null}
          </span>
        </li>
        <li className={styles.li} onClick={toggleConfiguration}>
          <span className={styles.liContainer}>
            <AdminPanelSettingsOutlinedIcon />
            {expanded && <span className={styles.span}>Configurations</span>}
          </span>
          {configurationExpanded
            ? expanded && <span className={styles.span}>&#9650;</span>
            : expanded && <span className={styles.span}>&#9660;</span>}
        </li>
        {/* Sub-links for configurations */}
        {configurationExpanded && (
          <ul className={`${styles.subMenu}`}>
            <li
              className={styles.li}
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                setConfigurationExpanded(!configurationExpanded);
                navigate("manage-courses");
              }}
            >
              - Manage Courses
            </li>
            <li
              className={styles.li}
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                setConfigurationExpanded(!configurationExpanded);
                navigate("manage-lecturers");
              }}
            >
              - Manage Lecturers
            </li>
            <li
              className={styles.li}
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                setConfigurationExpanded(!configurationExpanded);
                navigate("manage-batches");
              }}
            >
              - Manage Batches
            </li>
            <li
              className={styles.li}
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                setConfigurationExpanded(!configurationExpanded);
                navigate("manage-branches");
              }}
            >
              - Manage Branches
            </li>
            <li
              className={styles.li}
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                setConfigurationExpanded(!configurationExpanded);
                navigate("manage-users");
              }}
            >
              - Manage Users
            </li>
          </ul>
        )}

        <li className={styles.li} onClick={toggleLogins}>
          <span className={styles.liContainer}>
            <PersonOutlineOutlinedIcon />
            {expanded && <span className={styles.span}>View Logins</span>}
          </span>
          {loginsExpanded
            ? expanded && <span className={styles.span}>&#9650;</span>
            : expanded && <span className={styles.span}>&#9660;</span>}
        </li>
        {/* Sub-links for configurations */}
        {loginsExpanded && (
          <ul className={`${styles.subMenu}`}>
            <li
              className={styles.li}
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                setLoginsExpanded(!loginsExpanded);
                navigate("login-details");
              }}
            >
              - My Logins
            </li>
            <li
              className={styles.li}
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                setLoginsExpanded(!loginsExpanded);
                navigate("all-login-details");
              }}
            >
              - All Users
            </li>
          </ul>
        )}
      </ul>
    </>
  );
};

export default AdminNav;
