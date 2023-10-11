import { React, useState } from "react";

// Styles
import styles from "./manageBatches.module.css";

// Components
import TableComponent from "./components/batchTable";
import InputField from "../../components/inputField";
import PrimaryButton from "../../components/primaryButton";
import SearchField from "../../components/searchField";

import data from "./sampleData";

const tableColumns = [
  "Batch Code",
  "Course",
  "Branch",
  "Start Date",
  "End Date",
  "State",
  "Action",
];

const ManageBatches = () => {
  const [batchCode, setBatchCode] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [state, setState] = useState("");

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted, and values are:");
    console.log(batchCode, course, branch, startDate, endDate, state);
    alert("Check console for values");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <p className={styles.heading}>Create New Batch</p>
          <form onSubmit={handleSubmit}>
            <InputField
              lable={"Batch Code"}
              placeholder={"Enter Batch Code"}
              setValue={setBatchCode}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"Course"}
              placeholder={"Enter Course"}
              setValue={setCourse}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"Branch"}
              placeholder={"Enter Branch"}
              setValue={setBranch}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"Start Date"}
              placeholder={"Enter Start Date"}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"End Date"}
              placeholder={"Enter End Date"}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"Batch State"}
              placeholder={"Enter Batch State"}
              setValue={setState}
              style={{ width: "300px" }}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrimaryButton
                label={"Create Batch"}
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
          <p className={styles.subHeading}>Manage Batches</p>
          <SearchField lable={"Search By Name"} handleChange={handleSearch} />
          <div>
            <TableComponent columns={tableColumns} rows={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageBatches;
