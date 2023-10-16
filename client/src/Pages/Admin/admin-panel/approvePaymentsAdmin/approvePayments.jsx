import { React, useState } from "react";

// Styles
import styles from "./approvePayments.module.css";

// Components
import TableComponent from "./components/coverageTable";
import SearchField from "../../components/searchField";

// Sample data for table
import data from "./sampleData";

const tableColumns = [
  "Lecturer Name",
  "Course Name",
  "Batch Code",
  "Payment Month",
  "Total Hours",
  "Payment Rate",
  "Pay Amount",
  "Documents",
  "Action",
];

const ApprovePayments = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  return (
    <>
      <div className={styles.container}>
        <p className={styles.heading}>Approve Payments for Lecture Coverages</p>
        <SearchField
          lable={"Search by Lecturer Name"}
          handleChange={handleSearch}
        />
        <div>
          <TableComponent columns={tableColumns} rows={data} />
        </div>
      </div>
    </>
  );
};

export default ApprovePayments;
