import { React, useState, useEffect } from "react";

// Styles
import styles from "./manageBatches.module.css";

// Components
import TableComponent from "./components/batchTable";
import InputField from "../../components/inputField";
import PrimaryButton from "../../components/primaryButton";
import SearchField from "../../components/searchField";
import DropdownField from "../../components/dropdownField";

import Service from "../../../../utilities/httpService";


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
  const [batches, setBatches] = useState([]);

  const service = new Service();

  const courseList = [
    { _id: "1", name: "Software Engineering" },
    { _id: "2", name: "Cyber Security" },
    { _id: "3", name: "Data Science" },
  ];

  const branchList = [
    { _id: "1", name: "Malabe" },
    { _id: "2", name: "Metro" },
    { _id: "3", name: "Kandy" },
  ];

  const stateList = [
    { _id: "1", name: "Active" },
    { _id: "2", name: "Inactive" },
  ];

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  // Handling the dropdown fields
  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
  };

  useEffect(() => {
    getBatches();
  }, []);


  function getBatches() {
    const respone = service.get(`batch/all`)
    respone.then((res) => {
      setBatches(res.data);
    })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  // End

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
            {/* <InputField
              lable={"Course"}
              placeholder={"Enter Course"}
              setValue={setCourse}
              style={{ width: "300px" }}
            /> */}
            {/* <InputField
              lable={"Branch"}
              placeholder={"Enter Branch"}
              setValue={setBranch}
              style={{ width: "300px" }}
            /> */}
            <DropdownField
              lable={"Course"}
              list={courseList}
              handleOptionChange={handleCourseChange}
              selectedBranch={course}
              style={{ width: "318px" }}
            />
            <DropdownField
              lable={"Branch"}
              list={branchList}
              handleOptionChange={handleBranchChange}
              selectedBranch={branch}
              style={{ width: "318px" }}
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
            {/* <InputField
              lable={"Batch State"}
              placeholder={"Enter Batch State"}
              setValue={setState}
              style={{ width: "300px" }}
            /> */}
            <DropdownField
              lable={"Batch State"}
              list={stateList}
              handleOptionChange={handleStateChange}
              selectedBranch={state}
              style={{ width: "318px" }}
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
            <TableComponent columns={tableColumns} rows={batches} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageBatches;
