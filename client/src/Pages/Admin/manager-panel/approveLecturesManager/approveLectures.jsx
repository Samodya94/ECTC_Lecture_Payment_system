import { React, useMemo, useEffect, useState, useCallback } from "react";

import Service from "../../../../utilities/httpService"

// Styles
import styles from "./approveLectures.module.css";

// Components
import TableComponent from "./components/coverageTable";

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

  const service = useMemo(() => new Service(), []);

  const [approveCoverages, setApproveCoverages] = useState([]);

  const getApproveLectureCoverage = useCallback(() => {
    const response = service.get(`coverage/notapproved`);
    response
      .then((res) => {
        setApproveCoverages(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [service]);

  useEffect(() => {
    getApproveLectureCoverage();
  }, [getApproveLectureCoverage]);


  return (
    <>
      <div className={styles.container}>
        <p className={styles.heading}>Approve Lecture Coverages</p>
        <div>
          <TableComponent columns={tableColumns} rows={approveCoverages} />
        </div>
      </div>
    </>
  );
};

export default ApproveLectures;
