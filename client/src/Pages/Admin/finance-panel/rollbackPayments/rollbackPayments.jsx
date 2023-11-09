import { React, useState } from "react";

// Styles
import styles from "./rollbackPayments.module.css";

// Components
import TableComponent from "./components/paymentRollbackTable";
import MonthSelector from "../../components/monthSelectorField";

// Sample data for table
const data = [
  {
    lecturerName: "Asha Madushani",
    courseName: "ELS",
    batchCode: "ELS - Susadi -BM - Sept 2023",
    payMonth: "2023-09",
    totalHours: "3h : 0m",
    payRate: "Hourly Rate",
    hourlyPayment: "3000",
    totalPayment: "9000",
  },
  {
    lecturerName: "Asha Madushani",
    courseName: "ELS",
    batchCode: "ELS - Susadi -BM - Sept 2023",
    payMonth: "2023-09",
    totalHours: "3h : 0m",
    payRate: "Hourly Rate",
    hourlyPayment: "3000",
    totalPayment: "9000",
  },
  {
    lecturerName: "Asha Madushani",
    courseName: "ELS",
    batchCode: "ELS - Susadi -BM - Sept 2023",
    payMonth: "2023-09",
    totalHours: "3h : 0m",
    payRate: "Hourly Rate",
    hourlyPayment: "3000",
    totalPayment: "9000",
  },
  {
    lecturerName: "Asha Madushani",
    courseName: "ELS",
    batchCode: "ELS - Susadi -BM - Sept 2023",
    payMonth: "2023-09",
    totalHours: "3h : 0m",
    payRate: "Hourly Rate",
    hourlyPayment: "3000",
    totalPayment: "9000",
  },
  {
    lecturerName: "Asha Madushani",
    courseName: "ELS",
    batchCode: "ELS - Susadi -BM - Sept 2023",
    payMonth: "2023-09",
    totalHours: "3h : 0m",
    payRate: "Hourly Rate",
    hourlyPayment: "3000",
    totalPayment: "9000",
  },
  {
    lecturerName: "Asha Madushani",
    courseName: "ELS",
    batchCode: "ELS - Susadi -BM - Sept 2023",
    payMonth: "2023-09",
    totalHours: "3h : 0m",
    payRate: "Hourly Rate",
    hourlyPayment: "3000",
    totalPayment: "9000",
  },
];

const tableColumns = [
  "Lecturer Name",
  "Course Name",
  "Batch Code",
  "Month",
  "Total Hours",
  "Payment Rate",
  "Hourly Payment",
  "Total Payment",
  "Documents",
  "Action",
];

const RollbackPayments = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

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
        <p className={styles.heading}>Rollback Payments</p>
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
          <TableComponent columns={tableColumns} rows={data} />
        </div>
      </div>
    </>
  );
};

export default RollbackPayments;
