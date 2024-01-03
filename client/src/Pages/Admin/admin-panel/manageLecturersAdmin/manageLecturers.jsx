import { React, useState, useCallback, useEffect, useMemo } from "react";

// Styles
import styles from "./manageLecturers.module.css";

// Components
import TableComponent from "./components/lecturerTable";
import InputField from "../../components/inputField";
import PrimaryButton from "../../components/primaryButton";
import SearchField from "../../components/searchField";
import DropdownField from "../../components/dropdownField";

import Service from "../../../../utilities/httpService";

const tableColumns = [
  "Name",
  "Username",
  "NIC",
  "Email",
  "Phone",
  "Branch",
  "Reg Date",
  "Action",
];

const ManageLecturers = () => {
  const [nic, setNic] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");

  const [search, setSearch] = useState("");
  const [lecturers, setLecturers] = useState([]);

  const service = useMemo(() => new Service(), []);

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

  const getLecturers = useCallback(() => {
    const response = service.get(`lecturer/`);
    response
      .then((res) => {
        setLecturers(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [service]);

  useEffect(() => {
    getLecturers();

  }, [getLecturers]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      getLecturers();
    } else {
      const filteredLectures = lecturers.filter((lecturer) =>
        lecturer.firstName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setLecturers(filteredLectures);
    }
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  //new lecturer 
  const newLecturer = {
    nic: nic,
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    branch: branch,
    password: "ectc",
  };

  //create new lecturer function
  function createLecturer(e) {
    e.preventDefault();
    if (nic === "" || username === "" || firstName === "" || lastName === "" || email === "" || phone === "" || branch === "") {
      alert("Please fill all the fields");
      return;
    }
    //if phone number is not 10 digits or not a number
    if (phone.length !== 10 || isNaN(phone)) {
      alert("Please enter a valid phone number");
      return;
    }
    //if email is not valid
    if (!email.includes("@") || !email.includes(".") || email.split(".")[1].split(".")[0].length < 1) {
      alert("Please enter a valid email address");
      return;
    }
    //if nic has max 12 characters
    if (nic.length > 12) {
      alert("Please enter a valid NIC");
      return;
    }

    const response = service.post(`lecturer/`, newLecturer);
    response.then((res) => {
      alert("New Lecturer Added");
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <p className={styles.heading}>Lecturer Registration</p>
          <form onSubmit={createLecturer}>
            <InputField
              lable={"NIC"}
              placeholder={"Enter NIC"}
              setValue={setNic}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"Username"}
              placeholder={"Enter Username"}
              setValue={setUsername}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"First Name"}
              placeholder={"Enter First Name"}
              setValue={setFirstName}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"Last Name"}
              placeholder={"Enter Last Name"}
              setValue={setLastName}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"Email"}
              placeholder={"Enter Email Address"}
              setValue={setEmail}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"Phone Number"}
              placeholder={"Enter Phone Number"}
              setValue={setPhone}
              style={{ width: "300px" }}
            />
            <DropdownField
              lable={"Branch"}
              list={branchListAll}
              handleOptionChange={handleBranchChange}
              selectedBranch={branch}
              style={{ width: "318px" }}
            />
            <div className={styles.inputFieldContainer}>
              <label htmlFor="courseName" className={styles.lable}>
                Default Password:
              </label>
              <input
                type="text"
                className={styles.inputField}
                id="courseName"
                value={"ectc"}
                disabled
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrimaryButton
                label={"Register"}
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
          <p className={styles.subHeading}>Lecturer Details</p>
          <SearchField lable={"Search By Name"} handleChange={handleSearch} />
          <div>
            <TableComponent columns={tableColumns} rows={lecturers} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageLecturers;
