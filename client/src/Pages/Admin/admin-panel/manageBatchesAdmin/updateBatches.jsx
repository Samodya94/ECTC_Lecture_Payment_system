import { React, useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from 'react-router-dom'

import Service from "../../../../utilities/httpService";

// Styles
import styles from "./manageBatches.module.css";

// Components
import InputField from "../../components/inputField";
import PrimaryButton from "../../components/primaryButton";
import DropdownField from "../../components/dropdownField";

const UpdateBatches = () => {
  const navigate = useNavigate();
  const Param = useParams();
  const id = Param.id;

  const service = useMemo(() => new Service(), []);

  //get all courses and list them in the dropdown id:courseName name:courseName
  useEffect(() => {
    const respone = service.get(`course/all`)
    respone.then((res) => {
      setCourseList(res.data);
    }).catch((err) => {
      alert(err);
    })
  }, [service]);

  const [courseList, setCourseList] = useState([]);

  const courseListAll = courseList.map((item) => {
    return { _id: item.courseName, name: item.courseName };
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

  const [batchCode, setBatchCode] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [batchState, setBatchState] = useState("");

  //get all batch details and set them to the fields
  useEffect(() => {
    function loadBatch() {
      const response = service.get(`batch/${id}`);
      response.then((res) => {
        setBatchCode(res.data.batchCode);
        setCourse(res.data.course);
        setBranch(res.data.branch);
        setStartDate(res.data.startDate);
        setEndDate(res.data.endDate);
        setBatchState(res.data.batchState);
      }).catch((err) => {
        alert(err);
      });
    }

    loadBatch();
  }, [id, service]);

  //update batch details
  const data = {
    batchCode: batchCode,
    course: course,
    branch: branch,
    startDate: startDate,
    endDate: endDate,
    batchState: batchState,
  };

  //update batch details function
  function editBatch(e) {
    const respone = service.put(`batch`, id, data)
    respone.then((res) => {
      alert("Edit Successfull");
      navigate('/admin/manage-batches');
    })
      .catch((err) => {
        alert(err);
      });
    e.preventDefault();
  }

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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <p className={styles.heading}>Update Batch</p>
          <form onSubmit={editBatch}>
            <InputField
              lable={"Batch Code"}
              placeholder={"Enter Batch Code"}
              value={batchCode}
              setValue={setBatchCode}
              style={{ width: "300px" }}
            />
            <DropdownField
              lable={"Course"}
              list={courseListAll}
              handleOptionChange={handleCourseChange}
              style={{ width: "318px" }}
            />
            <DropdownField
              lable={"Branch"}
              list={branchListAll}
              selectedBranch={branch}
              handleOptionChange={handleBranchChange}
              style={{ width: "318px" }}
            />
            <InputField
              lable={"Start Date"}
              placeholder={"Enter Start Date"}
              value={startDate.slice(0, 10)}
              setValue={setStartDate}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"End Date"}
              placeholder={"Enter End Date"}
              value={endDate.slice(0, 10)}
              setValue={setEndDate}
              style={{ width: "300px" }}
            />
            <DropdownField
              lable={"Batch State"}
              list={stateList}
              selectedBranch={batchState}
              handleOptionChange={handleStateChange}
              style={{ width: "318px" }}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrimaryButton
                label={"Update Batch"}
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

export default UpdateBatches;
