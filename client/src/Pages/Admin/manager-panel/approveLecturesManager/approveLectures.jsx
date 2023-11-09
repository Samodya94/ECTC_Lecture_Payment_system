import React from "react";

// Styles
import styles from "./approveLectures.module.css";

// Components
import TableComponent from "./components/coverageTable";

// Sample data for table
import data from "./sampleData";

const tableColumns = [
  "Lecturer Name",
  "Course Name",
  "Batch Code",
  "Date",
  "Start Time",
  "End Time",
  "Total Hours",
  "Lecture Coverage",
  "Action",
];

const ApproveLectures = () => {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.heading}>Approve Lecture Coverages</p>
        <div>
          <TableComponent columns={tableColumns} rows={data} />
        </div>
      </div>
    </>
  );
};

export default ApproveLectures;
