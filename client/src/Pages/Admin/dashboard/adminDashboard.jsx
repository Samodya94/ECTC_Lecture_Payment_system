import { React, useEffect, useState, useMemo } from "react";

// Styles
import styles from "./adminDashboard.module.css";

// Components
import InfoCard from "./components/infoCard";

import Service from "../../../utilities/httpService";

const AdminDashboard = () => {
  const service = useMemo(() => new Service(), []);

  const [totalCourses, setTotalCourses] = useState(0);
  const [totalBatches, setTotalBatches] = useState(0);

  //get all courses and count them
  useEffect(() => {
    const respone = service.get(`course/all`)
    respone.then((res) => {
      setTotalCourses(res.data.length);
    }).catch((err) => {
      alert(err);
    })
  }, [service]);

  //get all batches and count them
  useEffect(() => {
    const respone = service.get(`batch/all`)
    respone.then((res) => {
      setTotalBatches(res.data.length);
    }).catch((err) => {
      alert(err);
    })
  }, [service]);


  return (
    <>
      <div className={styles.container}>
        <InfoCard icon={"totBatch"} label={"Total Batches"} count={totalBatches} />
        <InfoCard icon={"totCourse"} label={"Total Courses"} count={totalCourses} />
        <InfoCard icon={"totLecturer"} label={"Total Lecturers"} count="150" />
      </div>
    </>
  );
};

export default AdminDashboard;
