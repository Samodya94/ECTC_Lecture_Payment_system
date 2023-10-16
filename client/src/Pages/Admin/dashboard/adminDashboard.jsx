import React from "react";

// Styles
import styles from "./adminDashboard.module.css";

// Components
import InfoCard from "./components/infoCard";

const AdminDashboard = () => {
  return (
    <>
      <div className={styles.container}>
        <InfoCard icon={"totBatch"} label={"Total Batches"} count="200" />
        <InfoCard icon={"totCourse"} label={"Total Courses"} count="175" />
        <InfoCard icon={"totLecturer"} label={"Total Lecturers"} count="150" />
      </div>
    </>
  );
};

export default AdminDashboard;
