import React from "react";

// Styles
import styles from "./infoCard.module.css";

// Material UI icons
// Total batches icon
import Groups3OutlinedIcon from "@mui/icons-material/Groups3Outlined";
// Total courses icon
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
// Total lecturers icon
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const InfoCard = ({ icon, label, count }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.cardHeader}>
          {icon === "totBatch" ? (
            <Groups3OutlinedIcon className={styles.icon} />
          ) : icon === "totCourse" ? (
            <BusinessCenterOutlinedIcon className={styles.icon} />
          ) : icon === "totLecturer" ? (
            <PersonOutlineOutlinedIcon className={styles.icon} />
          ) : null}
          <p className={styles.label}>{label}</p>
        </div>
        <p className={styles.count}>{count}</p>
      </div>
    </>
  );
};

export default InfoCard;
