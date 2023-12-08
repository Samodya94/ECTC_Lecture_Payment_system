import { React, useState, useCallback, useEffect, useMemo } from "react";

// Styles
import styles from "./addPayments.module.css";

// Components
import TableComponent from "./components/addPaymentTable";
import MonthSelector from "../../components/monthSelectorField";
import PendingTableComponent from "./components/approvalPendingTable";

import Service from "../../../../utilities/httpService";

// Sample data for table
const data = [
  {
    lecturerName: "Asha Madushani",
    branch: "Kandy",
    courseName: "Python",
    batchCode: "PYTHON/K/07",
    payMonth: "2023-09",
    payRate: "30% Rate",
  },
  {
    lecturerName: "Asha Madushani",
    branch: "Kandy",
    courseName: "Python",
    batchCode: "PYTHON/K/07",
    payMonth: "2023-09",
    payRate: "30% Rate",
  },
  {
    lecturerName: "Asha Madushani",
    branch: "Kandy",
    courseName: "Python",
    batchCode: "PYTHON/K/07",
    payMonth: "2023-09",
    payRate: "30% Rate",
  },
  {
    lecturerName: "Asha Madushani",
    branch: "Kandy",
    courseName: "Python",
    batchCode: "PYTHON/K/07",
    payMonth: "2023-09",
    payRate: "30% Rate",
  },
  {
    lecturerName: "Asha Madushani",
    branch: "Kandy",
    courseName: "Python",
    batchCode: "PYTHON/K/07",
    payMonth: "2023-09",
    payRate: "30% Rate",
  },
];

const tableColumns = [
  "Lecturer Name",
  "Branch",
  "Course Name",
  "Batch Code",
  "Pay Month",
  "Pay Rate",
  "Action",
];

const AddPayments = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [approvedCoverages, setApprovedCoverages] = useState([]);
  const service = useMemo(() => new Service(), []);

  const getApprovedCoverages = useCallback(async () => {
    try {
      const response = await service.get("/coverage/approved");
      setApprovedCoverages(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [service]);

  useEffect(() => {
    getApprovedCoverages();
  }, [getApprovedCoverages]);


  const handleDateChange = (event) => {
    const selectedValue = event.target.value;

    // Extracting month and year from the selected date
    const [year, month] = selectedValue.split("-");

    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(selectedMonth, selectedYear);
  };



  return (
    <>
      <div className={styles.container}>
        <p className={styles.heading}>Add Payments for Approved Lectures</p>
        <form className={styles.searchContainer} onSubmit={handleSearch}>
          <MonthSelector
            handleDateChange={handleDateChange}
            style={{ width: "300px", marginLeft: "0px" }}
          />
          <button className={styles.button} type="submit">
            View
          </button>
        </form>
        <div>
          <TableComponent columns={tableColumns} rows={approvedCoverages} />
        </div>
        <p className={styles.heading} style={{ marginTop: "50px" }}>
          Approval Pending Payments
          {selectedYear ? ` - ${selectedYear} / ${selectedMonth}` : ""}
        </p>
        <div>
          <PendingTableComponent columns={tableColumns} rows={[]} />
        </div>
      </div>
    </>
  );
};

export default AddPayments;
