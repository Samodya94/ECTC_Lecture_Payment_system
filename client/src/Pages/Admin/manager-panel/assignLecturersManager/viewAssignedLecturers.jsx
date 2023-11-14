import { React, useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Styles
import styles from "./assignLecturers.module.css";

// Components
import InputFieldDis from "../../components/inputFieldDis";
import PrimaryButton from "../../components/primaryButton";
import DropdownField from "../../components/dropdownField";
import InputNumField from "../../components/inputNumField";

import Service from "../../../../utilities/httpService";

const ViewAssignedLecturers = () => {
  const [lecturerName, setLecturerName] = useState("");
  const [lecturerNic, setLecturerNic] = useState("");
  const [course, setCourse] = useState("");
  const [batchCode, setBatchCode] = useState("");
  const [rate, setRate] = useState("");
  const [hours, setHours] = useState("");

  const service = useMemo(() => new Service(), []);

  const navigate = useNavigate();
  const Param = useParams();
  const id = Param.id;

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form Submitted, and values are:");
  //   console.log(
  //     lecturerName,
  //     course,
  //     batchCode,
  //     rate,
  //     hours,
  //   );
  //   alert("Check console for values");
  // };

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

  const handleLecturerChange = (e) => {
    setLecturerName(e.target.value);
  };

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
    return { _id: item.batchCode, name: item.batchCode };
  });

  const handleBatchChange = (e) => {
    setBatchCode(e.target.value);
  };

  const rateList = [
    { _id: "Hourly Rate", name: "Hourly Rate" },
    { _id: "30% Rate", name: "30% Rate" },
  ];

  const handleRateChange = (e) => {
    setRate(e.target.value);
  };

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

  //get course from batch code
  async function getCourse(batchCode) {
    try {
      let course = "";
      batchCodeList.forEach((item) => {
        if (item.batchCode === batchCode) {
          course = item.course;
        }
      });
      return course;
    } catch (err) {
      console.log(err);
    }
  }

  //get assigend batch details and set them to the fields
  useEffect(() => {
    function loadAssignBatch() {
      const response = service.get(`assignbatch/${id}`);
      response.then((res) => {
        setLecturerName(res.data.lecturerName);
        setLecturerNic(res.data.lecturerNic);
        setBatchCode(res.data.batchCode);
        setCourse(res.data.course);
        setRate(res.data.rate);
        setHours(res.data.hours);
      }).catch((err) => {
        alert(err);
      });
    }

    loadAssignBatch();
  }, [id, service]);

  function editAssignBatch(e) {
    e.preventDefault();
    // Move the calls inside the function
    const lecturerNic = getLecturerNic(lecturerName);
    const course = getCourse(batchCode);

    // Wait for both promises to resolve
    Promise.all([lecturerNic, course])
      .then(([nic, course]) => {
        const assignBatch = {
          lecturerNic: nic,
          lecturerName: lecturerName,
          course: course,
          batchCode: batchCode,
          rate: rate,
          hours: hours,
        };

        const response = service.put(`assignbatch`, id, assignBatch);
        response
          .then((res) => {
            alert("Edit Assigned to batch Successfully");
            navigate('/admin/assign-batches');
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
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <p className={styles.heading}>Assigned Course Details</p>
        <form onSubmit={editAssignBatch}>
          <InputFieldDis
            lable={"Lecturer NIC"}
            placeholder={"Enter Lecturer NIC"}
            value={lecturerNic}
            style={{ width: "300px" }}
          />

          <DropdownField
            lable={"Lecturer Name"}
            list={lecturerListAll}
            handleOptionChange={handleLecturerChange}
            selectedBranch={lecturerName}
            style={{ width: "318px" }}
          />
          <InputFieldDis
            lable={"Course Name"}
            placeholder={"Enter Course Name"}
            value={course}
            style={{ width: "300px" }}
          />
          <DropdownField
            lable={"Lecturer Name"}
            list={batchCodeListAll}
            handleOptionChange={handleBatchChange}
            selectedBranch={batchCode}
            style={{ width: "318px" }}
          />
          <DropdownField
            lable={"Payment Rate"}
            list={rateList}
            handleOptionChange={handleRateChange}
            selectedBranch={rate}
            style={{ width: "318px" }}
          />

          <InputNumField
            lable={"No of Hours"}
            placeholder={"Enter No of Hours"}
            value={hours}
            setValue={setHours}
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
