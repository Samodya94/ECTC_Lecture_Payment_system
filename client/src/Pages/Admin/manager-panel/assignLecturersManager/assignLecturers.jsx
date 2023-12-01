import { React, useState, useEffect, useMemo, useCallback } from "react";

// Styles
import styles from "./assignLecturers.module.css";

// Components
import DropdownInput from "./components/dropdownInput";
import TableComponent from "./components/assignedBatchesTable";
import InputNumField from "../../components/inputNumField";
import PrimaryButton from "../../components/primaryButton";
import InputNumFieldDis from "../../components/inputNumFieldDis";

import Service from "../../../../utilities/httpService";
import DropdownField from "../../components/dropdownField";

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

const AssignLecturers = () => {
  const [lecturer, setLecturer] = useState("");
  const [lecturerName, setLecturerName] = useState("");
  const [batchCode, setBatchCode] = useState("");
  const [paymentRate, setPaymentRate] = useState("");
  const [noOfHours, setNoOfHours] = useState(0);
  const [hourlyPay, setHourlyPay] = useState(0);
  const [assignedBatches, setAssignedBatches] = useState([]);


  const service = useMemo(() => new Service(), []);

  const getAssignedBatches = useCallback(() => {
    const response = service.get(`assignbatch/`);
    response
      .then((res) => {
        setAssignedBatches(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [service]);

  useEffect(() => {
    getAssignedBatches();
  }, [getAssignedBatches]);

  //get all lectures and list them in the dropdown id:courseName name:courseName
  useEffect(() => {
    const respone = service.get(`lecturer/`)
    respone.then((res) => {
      setLecturerList(res.data);
    }).catch((err) => {
      alert(err);
    })
  }, [service]);

  const [lecturerList, setLecturerList] = useState([]);

  const lecturerListAll = lecturerList.map((item) => {
    return { _id: item.firstName + " " + item.lastName, name: item.firstName + " " + item.lastName };
  });

  //get all batches and list them in the dropdown id:courseName name:courseName
  useEffect(() => {
    const respone = service.get(`batch/all`)
    respone.then((res) => {
      setBatchCodeList(res.data);
    }).catch((err) => {
      alert(err);
    })
  }, [service]);

  const [batchCodeList, setBatchCodeList] = useState([]);

  const batchCodeListAll = batchCodeList.map((item) => {
    return { _id: item._id, name: item.batchCode };
  });

  //get nic from lecturer name
  async function getLecturerNic(lecturerName) {
    try {
      let nic = "";
      lecturerList.forEach((item) => {
        if (item.firstName + " " + item.lastName === lecturerName) {
          nic = item.nic;
        }
      });
      return nic;
    } catch (err) {
      console.log(err);
    }
  }

  //get id from lecturer name
  async function getLecturerId(lecturerName) {
    try {
      let id = "";
      lecturerList.forEach((item) => {
        if (item.firstName + " " + item.lastName === lecturerName) {
          id = item._id;
        }
      });
      return id;
    } catch (err) {
      console.log(err);
    }
  }

  //get course from batch code
  async function getCourse(batchCode) {
    try {
      let course = "";
      batchCodeList.forEach((item) => {
        if (item._id === batchCode) {
          course = item.course;
        }
      });
      return course;
    } catch (err) {
      console.log(err);
    }
  }

  const handleOptionChange = (e) => {
    setLecturer(e.target.value);
  };

  //search assigned batches by lecturer name and reset form to show all assigned batches
  const handleSearch = (e) => {
    e.preventDefault();
    if (lecturer === "") {
      getAssignedBatches();
    } else {
      const response = assignedBatches.filter((item) => {
        return item.lecturerName === lecturer;
      });
      setAssignedBatches(response);
    }
  };

  const handleLecturerChange = (e) => {
    setLecturerName(e.target.value);
  };

  const handleBatchChange = (e) => {
    setBatchCode(e.target.value);
  };

  const handleRateChange = (e) => {
    setPaymentRate(e.target.value);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setLecturer("");
    getAssignedBatches();
  };

  const rateList = [
    { _id: "Hourly Rate", name: "Hourly Rate" },
    { _id: "30% Rate", name: "30% Rate" },
  ];

  function createAssignBatch(e) {
    e.preventDefault();

    // Move the calls inside the function
    const lecturerNic = getLecturerNic(lecturerName);
    const course = getCourse(batchCode);
    const _id = getLecturerId(lecturerName);

    // Wait for both promises to resolve
    Promise.all([lecturerNic, course, _id])
      .then(([nic, course, _id]) => {
        const newAssignBatch = {
          lecturerID: _id,
          lecturerNic: nic,
          lecturerName: lecturerName,
          course: course,
          batchCode: batchCode,
          rate: paymentRate,
          hours: noOfHours,
          remaining_hours: noOfHours * 3600000,
          hourly_pay: hourlyPay,
        };

        const response = service.post(`assignbatch/`, newAssignBatch);
        response
          .then((res) => {
            alert("Lecturer Assigned to batch Successfully");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      })  // Catch any errors
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <p className={styles.heading}>Assign Lecturers to Courses</p>
          <form onSubmit={createAssignBatch}>
            <DropdownField
              lable={"Lecturer Name"}
              list={lecturerListAll}
              handleOptionChange={handleLecturerChange}
              selectedBranch={lecturerName}
              style={{ width: "318px" }}
            />
            <DropdownField
              lable={"Batch Code"}
              list={batchCodeListAll}
              handleOptionChange={handleBatchChange}
              selectedBranch={batchCode}
              style={{ width: "318px" }}
            />

            <DropdownField
              lable={"Payment Rate"}
              list={rateList}
              handleOptionChange={handleRateChange}
              selectedBranch={paymentRate}
              style={{ width: "318px" }}
            />

            <InputNumField
              lable={"No of Hours"}
              placeholder={"Enter No of Hours"}
              setValue={setNoOfHours}
              style={{ width: "300px" }}
            />

            <InputNumFieldDis
              lable={"Hourly Pay"}
              placeholder={"Enter Hourly Pay"}
              setValue={setHourlyPay}
              style={{ width: "300px" }}
              disabled={paymentRate === "Hourly Rate" ? false : true}
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
            list={lecturerListAll}
            handleOptionChange={handleOptionChange}
            selectedBranch={lecturer}
            style={{ width: "300px", marginLeft: "0" }}
          />
          <button className={styles.button} type="submit">
            View
          </button>
          <button className={styles.button} onClick={handleReset}>
            Reset
          </button>
        </form>
        <div>
          <TableComponent columns={tableColumns} rows={assignedBatches} />
        </div>
      </div>
    </>
  );
};

export default AssignLecturers;
