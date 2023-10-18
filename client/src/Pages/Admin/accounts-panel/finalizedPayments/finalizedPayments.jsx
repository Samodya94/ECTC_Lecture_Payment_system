import { React, useState } from "react";

// Styles
import styles from "./finalizedPayments.module.css";

// Components
import TableComponent from "./components/finalizedPaymentTable";
import DropdownInput from "./components/dropdownInput";
import MonthSelector from "../../components/monthSelectorField";

// Sample data for table
const data = [
  {
    lecturerName: "Asha Madushani",
    courseName: "OOC (L) WEnd",
    batchCode: "OOC(Lab)-Asha-July 2023(Weekend)",
    Month: "2023-10",
    totalHours: "2h : 0m",
    payRate: "Hourly Rate",
    payAmount: "10000",
  },
  {
    lecturerName: "Asha Madushani",
    courseName: "OOC (L) WEnd",
    batchCode: "OOC(Lab)-Asha-July 2023(Weekend)",
    Month: "2023-10",
    totalHours: "2h : 0m",
    payRate: "Hourly Rate",
    payAmount: "10000",
  },
  {
    lecturerName: "Asha Madushani",
    courseName: "OOC (L) WEnd",
    batchCode: "OOC(Lab)-Asha-July 2023(Weekend)",
    Month: "2023-10",
    totalHours: "2h : 0m",
    payRate: "Hourly Rate",
    payAmount: "10000",
  },
  {
    lecturerName: "Asha Madushani",
    courseName: "OOC (L) WEnd",
    batchCode: "OOC(Lab)-Asha-July 2023(Weekend)",
    Month: "2023-10",
    totalHours: "2h : 0m",
    payRate: "Hourly Rate",
    payAmount: "10000",
  },
  {
    lecturerName: "Asha Madushani",
    courseName: "OOC (L) WEnd",
    batchCode: "OOC(Lab)-Asha-July 2023(Weekend)",
    Month: "2023-10",
    totalHours: "2h : 0m",
    payRate: "Hourly Rate",
    payAmount: "10000",
  },
];

const tableColumns = [
  "Lecturer Name",
  "Course Name",
  "Batch Code",
  "Month",
  "Total Hours",
  "Payment Rate",
  "Pay Amount",
  "Documents",
];

const lecturerList = [
  { _id: "1", name: "Asha Madushani" },
  { _id: "2", name: "Dammika Priyasad" },
  { _id: "3", name: "Charith Athulgala" },
];

const FinalizedPayments = () => {
  const [lecturer, setLecturer] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleDateChange = (event) => {
    const selectedValue = event.target.value;

    // Extracting month and year from the selected date
    const [year, month] = selectedValue.split("-");

    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handleOptionChange = (e) => {
    setLecturer(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(selectedMonth, selectedYear, lecturer);
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.heading}>Finalized Payment Reports</p>
        <form className={styles.searchContainer} onSubmit={handleSearch}>
          <MonthSelector
            handleDateChange={handleDateChange}
            style={{ width: "300px", marginLeft: "0px" }}
          />
          <DropdownInput
            list={lecturerList}
            handleOptionChange={handleOptionChange}
            selectedBranch={lecturer}
            style={{ width: "300px" }}
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

export default FinalizedPayments;
