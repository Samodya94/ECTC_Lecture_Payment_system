import { React, useState } from "react";

// Styles
import styles from "./confirmedPayments.module.css";

// Components
import DropdownField from "../../components/dropdownField";
import PrimaryButton from "../../components/primaryButton";
import MonthSelector from "../../components/monthSelectorField";

const ConfirmedPayments = () => {
  const [lecturerName, setLecturerName] = useState("");
  const [batch, setBatch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleDateChange = (event) => {
    const selectedValue = event.target.value;

    // Extracting month and year from the selected date
    const [year, month] = selectedValue.split("-");

    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handleLecturerChange = (e) => {
    setLecturerName(e.target.value);
  };

  const handleBatchChange = (e) => {
    setBatch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted, and values are:");
    console.log(lecturerName, batch, selectedMonth, selectedYear);
    alert("Check console for values");
  };

  const lecturerList = [
    { _id: "1", name: "Asha Madushani" },
    { _id: "2", name: "Dammika Priyasad" },
    { _id: "3", name: "Charith Athulgala" },
  ];

  const batchList = [
    { _id: "1", name: "CPITA/K/79 - Sat (Anura)" },
    { _id: "2", name: "CPITA/K/79 - Sat (Anura)" },
    { _id: "3", name: "CPITA/K/79 - Sat (Anura)" },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <p className={styles.heading}>Confirmed Lecturer Payments</p>
          <form onSubmit={handleSubmit}>
            <DropdownField
              lable={"Lecturer"}
              list={lecturerList}
              handleOptionChange={handleLecturerChange}
              selectedBranch={lecturerName}
              style={{ width: "318px" }}
            />
            <DropdownField
              lable={"Batch"}
              list={batchList}
              handleOptionChange={handleBatchChange}
              selectedBranch={batch}
              style={{ width: "318px" }}
            />
            <MonthSelector
              lable={"Month"}
              handleDateChange={handleDateChange}
              style={{ width: "300px", marginLeft: "0px" }}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrimaryButton
                label={"Export Report"}
                type={"submit"}
                style={{
                  backgroundColor: "#5A84AE",
                  padding: "10px 20px",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                  marginTop: "20px",
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConfirmedPayments;
