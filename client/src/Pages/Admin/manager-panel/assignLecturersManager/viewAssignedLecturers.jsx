import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./assignLecturers.module.css";

// Components
import InputField from "../../components/inputField";
import PrimaryButton from "../../components/primaryButton";

const ViewAssignedLecturers = () => {
  const [lecturerName, setLecturerName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [batchCode, setBatchCode] = useState("");
  const [paymentRate, setPaymentRate] = useState("");
  const [noOfHours, setNoOfHours] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted, and values are:");
    console.log(
      lecturerName,
      courseName,
      batchCode,
      paymentRate,
      noOfHours,
      hourlyRate
    );
    alert("Check console for values");
  };
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <p className={styles.heading}>Assigned Course Details</p>
        <form onSubmit={handleSubmit}>
          <InputField
            lable={"Lecturer Name"}
            placeholder={"Enter Lecturer Name"}
            setValue={setLecturerName}
            style={{ width: "300px" }}
          />
          <InputField
            lable={"Course Name"}
            placeholder={"Enter Course Name"}
            setValue={setCourseName}
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
          <InputField
            lable={"Hourly Rate (RS.)"}
            placeholder={"Enter Hourly Rate"}
            setValue={setHourlyRate}
            style={{ width: "300px" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <PrimaryButton
              label={"Update"}
              type={"submit"}
              style={{
                backgroundColor: "#5A84AE",
                padding: "10px 20px",
                fontWeight: "600",
                fontSize: "0.9rem",
                marginTop: "20px",
              }}
            />
            <PrimaryButton
              label={"Cancel"}
              type={"button"}
              onClick={() => {
                navigate("/admin/assign-batches/");
              }}
              style={{
                backgroundColor: "#F20C0C",
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
  );
};

export default ViewAssignedLecturers;
