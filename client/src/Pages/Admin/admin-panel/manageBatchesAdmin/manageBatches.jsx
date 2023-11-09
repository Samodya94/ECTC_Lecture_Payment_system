import { React, useState, useEffect, useMemo, useCallback } from "react";

// Styles
import styles from "./manageBatches.module.css";

// Components
import TableComponent from "./components/batchTable";
import InputField from "../../components/inputField";
import InputFieldDate from "../../components/inputFieldDate";
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
  const [batchState, setBatchState] = useState("");

  const [search, setSearch] = useState("");
  const [batches, setBatches] = useState([]);

  const service = useMemo(() => new Service(), []);

  //get all courses and list them in the dropdown id:courseName name:courseName
  useEffect(() => {
    const respone = service.get(`course/`)
    respone.then((res) => {
      setCourseList(res.data);
    }).catch((err) => {
      alert(err);
    })
  }, [service]);

  const [courseList, setCourseList] = useState([]);

  const courseListAll = courseList.map((item) => {
    return { _id: item.courseName, name: item.courseName + "  ( " + item.courseDuration + "months )" };
  });

  //get all branches and list them in the dropdown id:branchName name:branchName
  useEffect(() => {
    const respone = service.get(`branch/all`)
    respone.then((res) => {
      setBranchList(res.data);
    }).catch((err) => {
      alert(err);
    })
  }, [service]);

  const [branchList, setBranchList] = useState([]);

  const branchListAll = branchList.map((item) => {
    return { _id: item.branchName, name: item.branchName };
  });

  const stateList = [
    { _id: "Active", name: "Active" },
    { _id: "Inactive", name: "Inactive" },
  ];

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      getBatches();
    } else {
      const filteredBatches = batches.filter((batch) =>
        batch.batchCode.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setBatches(filteredBatches);
    }
  };

  // Handling the dropdown fields
  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };

  const handleStateChange = (e) => {
    setBatchState(e.target.value);
  };

  const getBatches = useCallback(() => {
    const response = service.get(`batch/all`);
    response
      .then((res) => {
        setBatches(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [service]);

  useEffect(() => {
    getBatches();
  }, [getBatches]);

  //new batch 
  const newBatch = {
    batchCode: batchCode,
    course: course,
    branch: branch,
    startDate: startDate,
    endDate: endDate,
    batchState: batchState,
  };

  //create new batch function
  function createBatch(e) {
    e.preventDefault();
    const response = service.post(`batch/`, newBatch);
    response.then((res) => {
      alert("New Batch Added");
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    })
  }

  //function to get course duration
  async function getCourseDuration(courseName) {
    try {
      const response = await service.get(`course/${courseName}`);
      console.log(response.data.courseDuration);
      return response.data.courseDuration;
    } catch (err) {
      console.log(err);
      throw err; // rethrow the error to be caught by the calling function
    }
  }


  //function to check course duration month > end date- start date 
  async function checkCourseDuration(e) {
    e.preventDefault();
    try {
      const duration = await getCourseDuration(newBatch.course);
      const start = new Date(newBatch.startDate);
      const end = new Date(newBatch.endDate);
      const diffTime = Math.abs(end - start);
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

      console.log(diffMonths);
      console.log(duration);

      if (diffMonths < duration) {
        alert("Batch Duration is less than the course duration");
      } else {
        createBatch(e);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <p className={styles.heading}>Create New Batch</p>
          <form onSubmit={checkCourseDuration}>
            <InputField
              lable={"Batch Code"}
              placeholder={"Enter Batch Code"}
              setValue={setBatchCode}
              style={{ width: "300px" }}
            />

            <DropdownField
              lable={"Course"}
              list={courseListAll}
              handleOptionChange={handleCourseChange}
              selectedBranch={course}
              style={{ width: "318px" }}
            />
            <DropdownField
              lable={"Branch"}
              list={branchListAll}
              handleOptionChange={handleBranchChange}
              selectedBranch={branch}
              style={{ width: "318px" }}
            />
            <InputFieldDate
              lable={"Start Date"}
              placeholder={"Enter Start Date"}
              setValue={setStartDate}
              style={{ width: "300px" }}
            />
            <InputFieldDate
              lable={"End Date"}
              placeholder={"Enter End Date"}
              setValue={setEndDate}
              style={{ width: "300px" }}
            />

            <DropdownField
              lable={"Batch State"}
              list={stateList}
              handleOptionChange={handleStateChange}
              selectedBranch={batchState}
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
