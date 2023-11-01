import { React, useState, useEffect } from "react";
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

  const service = new Service();

  const courseList = [
    { _id: "Software Engineering", name: "Software Engineering" },
    { _id: "Cyber Security", name: "Cyber Security" },
    { _id: "Data Science", name: "Data Science" },
  ];

  const branchList = [
    { _id: "Malabe", name: "Malabe" },
    { _id: "Metro", name: "Metro" },
    { _id: "Kandy", name: "Kandy" },
  ];

  const stateList = [
    { _id: "Active", name: "Active" },
    { _id: "Inactive", name: "Inactive" },
  ];

  useEffect(() => {
    loadBatch();
  }, []);

  const [batchCode, setBatchCode] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [batchState, setBatchState] = useState("");


  function loadBatch() {
    const respone = service.get(`batch/${id}`)
    respone.then((res) => {
      setBatchCode(res.data.batchCode);
      setCourse(res.data.course);
      setBranch(res.data.branch);
      setStartDate(res.data.startDate);
      setEndDate(res.data.endDate);
      setBatchState(res.data.batchState);

    }).catch((err) => {
      alert(err);
    })
  };

  const data = {
    batchCode: batchCode,
    course: course,
    branch: branch,
    startDate: startDate,
    endDate: endDate,
    batchState: batchState,
  };

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
              list={courseList}
              handleOptionChange={handleCourseChange}
              style={{ width: "318px" }}
            />
            <DropdownField
              lable={"Branch"}
              list={branchList}
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
