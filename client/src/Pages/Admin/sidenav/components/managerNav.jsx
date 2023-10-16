import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "../adminSideNav.module.css";

// MUI icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

const AdminNav = ({ expanded, setExpanded }) => {
  const [configurationExpanded, setConfigurationExpanded] = useState(false);
  const [lecCovarageExpanded, setLecCovarageExpanded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!expanded) {
      setConfigurationExpanded(false);
      setLecCovarageExpanded(false);
    }
  }, [expanded]);

  const toggleConfiguration = () => {
    if (!expanded) {
      setExpanded(!expanded);
    }
    setConfigurationExpanded(!configurationExpanded);
  };

  const toggleLecCoverage = () => {
    if (!expanded) {
      setExpanded(!expanded);
    }
    setLecCovarageExpanded(!lecCovarageExpanded);
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
        <li className={styles.li} onClick={toggleLecCoverage}>
          <span className={styles.liContainer}>
            <AutoStoriesOutlinedIcon />
            {expanded && <span className={styles.span}>Lecture Coverages</span>}
          </span>
          {lecCovarageExpanded
            ? expanded && <span className={styles.span}>&#9650;</span>
            : expanded && <span className={styles.span}>&#9660;</span>}
        </li>
        {/* Sub-links for configurations */}
        {lecCovarageExpanded && (
          <ul className={`${styles.subMenu}`}>
            <li
              className={styles.li}
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                setLecCovarageExpanded(!lecCovarageExpanded);
                navigate("");
              }}
            >
              - Assign Batches
            </li>
            <li
              className={styles.li}
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                setLecCovarageExpanded(!lecCovarageExpanded);
                navigate("approve-lectures");
              }}
            >
              - Approve Lectures
            </li>
            <li
              className={styles.li}
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                setLecCovarageExpanded(!lecCovarageExpanded);
                navigate("approved-lectures");
              }}
            >
              - Approved Lectures
            </li>
          </ul>
        )}
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
          </ul>
        )}
      </ul>
    </>
  );
};

export default AdminNav;
