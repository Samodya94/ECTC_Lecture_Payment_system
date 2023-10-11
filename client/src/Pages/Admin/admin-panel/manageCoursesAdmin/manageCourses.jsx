import { React, useState } from "react";

// Styles
import styles from "./manageCourses.module.css";

// Components
import TableComponent from "./components/coursesTable";
import InputField from "./components/inputField";
import PrimaryButton from "../../components/primaryButton";
import SearchField from "../../components/searchField";

// Sample data for table
import data from "./sampleData";

const tableColumns = ["Course Name", "Course Fee", "Course Duration", "Action"];

const ManageCourses = () => {
  const [courseName, setCourseName] = useState("");
  const [courseFee, setCourseFee] = useState("");
  const [courseDuration, setCourseDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted, and values are:");
    console.log(courseName, courseFee, courseDuration);
    alert("Check console for values");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <p className={styles.heading}>Manage Courses</p>
          <form onSubmit={handleSubmit}>
            <InputField
              lable={"Course Name"}
              placeholder={"Enter Course Name"}
              setValue={setCourseName}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"Course Fee (RS)"}
              placeholder={"Enter Course Fee"}
              setValue={setCourseFee}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"Course Duration (Months)"}
              placeholder={"Enter Course Duration"}
              setValue={setCourseDuration}
              style={{ width: "300px" }}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrimaryButton
                label={"Add Course"}
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
        <div>
          <p className={styles.subHeading}>Course Details</p>
          <SearchField />
          <div>
            <TableComponent columns={tableColumns} rows={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCourses;
