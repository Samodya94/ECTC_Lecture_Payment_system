import { React, useState, useMemo, useCallback, useEffect } from "react";

// Styles
import styles from "./approvePayments.module.css";
import DropdownInput from "./components/dropdownInput";

import Service from "../../../../utilities/httpService";

// Components
import TableComponent from "./components/coverageTable";

const tableColumns = [
  "Lecturer",
  "Course",
  "Batch",
  "Month",
  "Total Hours",
  "PayRate",
  "Payment",
  "Coverages",
  "Document",
  "Action",
];

const ApprovePayments = () => {

  const service = useMemo(() => new Service(), []);

  const [pendingPayment, setPendingPayment] = useState([]);

  const getPendingPayments = useCallback(async () => {
    try {
      const response = await service.get("/payment/admin/notapproved");
      setPendingPayment(response.data);
    } catch (error) {
      console.log(error);
    }
  }
    , [service]);

  useEffect(() => {
    getPendingPayments();
  }, [getPendingPayments]);

  const [lecturer, setLecturer] = useState("");

  useEffect(() => {
    const respone = service.get(`lecturer/`)
    respone.then((res) => {
      setLecturerList(res.data);
    }).catch((err) => {
      alert(err);
    })
  }, [service]);

  const [lecturerList, setLecturerList] = useState([]);

  const lecturerListAll = lecturerList.map((item) => {
    return { _id: item._id, name: item.firstName + " " + item.lastName };
  });

  const handleOptionChange = (e) => {
    setLecturer(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (lecturer === "") {
      getPendingPayments();
    }
    else {
      const response = pendingPayment.filter((item) => {
        return (item.lecturerId === lecturer);
      });
      setPendingPayment(response);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setLecturer("");
    getPendingPayments();
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.heading}>Approve Payments for Lecture Coverages</p>
        <form className={styles.searchContainer} onSubmit={handleSearch}>
          <DropdownInput
            list={lecturerListAll}
            handleOptionChange={handleOptionChange}
            selectedBranch={lecturer}
            style={{ width: "300px" }}
          />
          <button className={styles.button} type="submit">
            View
          </button>
          <button className={styles.button} onClick={handleReset}>
            Reset
          </button>
        </form>
        <div>
          <TableComponent columns={tableColumns} rows={pendingPayment} />
        </div>
      </div>
    </>
  );
};

export default ApprovePayments;
