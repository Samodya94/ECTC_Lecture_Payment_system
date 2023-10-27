import { React, useState } from "react";

// Styles
import styles from "./assignLecturers.module.css";

// Components
import DropdownInput from "./components/dropdownInput";
import TableComponent from "./components/assignedBatchesTable";
import InputField from "../../components/inputField";
import PrimaryButton from "../../components/primaryButton";

// Sample data for table
import data from "./sampleData";

const tableColumns = [
  "Lecturer NIC",
  "Lecturer Name",
  "Course Name",
  "Batch Code",
  "Pay Rate",
  "Total Hours",
  "Remaining Hours",
  "Action",
];

const lecturerList = [
  { _id: "1", name: "Asha Madushani" },
  { _id: "2", name: "Dammika Priyasad" },
  { _id: "3", name: "Charith Athulgala" },
];

const AssignLecturers = () => {
  const [lecturer, setLecturer] = useState("");
  const [lecturerName, setLecturerName] = useState("");
  const [batchCode, setBatchCode] = useState("");
  const [paymentRate, setPaymentRate] = useState("");
  const [noOfHours, setNoOfHours] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted, and values are:");
    console.log(lecturerName, batchCode, paymentRate, noOfHours);
    alert("Check console for values");
  };

  const handleOptionChange = (e) => {
    setLecturer(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(lecturer);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <p className={styles.heading}>Assign Lecturers to Courses</p>
          <form onSubmit={handleSubmit}>
            <InputField
              lable={"Lecturer Name"}
              placeholder={"Enter Lecturer Name"}
              setValue={setLecturerName}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"Batch Code"}
              placeholder={"Enter Batch Code"}
              setValue={setBatchCode}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"Payment Rate"}
              placeholder={"Enter Rate"}
              setValue={setPaymentRate}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"No of Hours"}
              placeholder={"Enter No of Hours"}
              setValue={setNoOfHours}
              style={{ width: "300px" }}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrimaryButton
                label={"Assign Lecturer"}
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
        <p className={styles.subHeading}>Assigned Batches</p>
        <form className={styles.searchContainer} onSubmit={handleSearch}>
          <DropdownInput
            list={lecturerList}
            handleOptionChange={handleOptionChange}
            selectedBranch={lecturer}
            style={{ width: "300px", marginLeft: "0" }}
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

export default AssignLecturers;
