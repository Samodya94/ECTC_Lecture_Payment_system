import { React, useEffect, useState } from "react";

import styles from "./manageUsers.module.css";

// Components
import TableComponent from "./components/userTable";
import TwoRowInput from "./components/twoRowInput";
import TwoRowDropdown from "./components/twoRowDropdown";
import PrimaryButton from "../../components/primaryButton";
import SearchField from "../../components/searchField";
import PhotoUploadCard from "./components/photoUploadCard";

import Service from "../../../../utilities/httpService";

const tableColumns = [
  "Profile Image",
  "Full Name",
  "Username",
  "Email",
  "User Level",
  "Action",
];

const ManageUsers = () => {
  const [fullName, setFullName] = useState("");
  const [branch, setBranch] = useState("");
  const [email, setEmail] = useState("");
  const [userLevel, setUserLevel] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

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

  const userLevels = [
    { _id: "0", name: "Admin" },
    { _id: "1", name: "Manager" },
    { _id: "2", name: "Finance" },
    { _id: "3", name: "Accounts" },
  ];

  useEffect(() => {
    getUsers();
  }, []);


  function getUsers() {
    const respone = service.get(`users/all`)
    respone.then((res) => {
      setUsers(res.data);
    })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }


  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };


  // Handling the dropdown fields
  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleUserLevelChange = (e) => {
    setUserLevel(e.target.value);
  };

  // End

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted, and values are:");
    console.log(fullName, email, branch, username, userLevel, profileImage);
    alert("Check console for values");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <p className={styles.heading}>Manage Users</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.formContainer}>
              <div>
                <PhotoUploadCard
                  profileImage={profileImage}
                  setProfileImage={setProfileImage}
                />
              </div>
              <div>
                <div className={styles.inputContainer}>
                  <TwoRowInput
                    lable={"Full Name"}
                    placeholder={"Enter Full Name"}
                    setValue={setFullName}
                    style={{ width: "200px" }}
                  />
                  <TwoRowDropdown
                    lable={"Branch"}
                    list={branchList}
                    handleOptionChange={handleBranchChange}
                    selectedBranch={branch}
                    style={{ width: "218px" }}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <TwoRowInput
                    lable={"Email"}
                    placeholder={"Enter Email"}
                    setValue={setEmail}
                    style={{ width: "200px" }}
                  />
                  <TwoRowDropdown
                    lable={"User Level"}
                    list={userLevels}
                    handleOptionChange={handleUserLevelChange}
                    selectedBranch={userLevel}
                    style={{ width: "218px" }}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <TwoRowInput
                    lable={"Username"}
                    placeholder={"Enter Username"}
                    setValue={setUsername}
                    style={{ width: "200px" }}
                  />
                  <div className={styles.inputFieldContainer}>
                    <label htmlFor="courseName" className={styles.lable}>
                      Password:
                    </label>
                    <input
                      type="text"
                      className={styles.inputField}
                      id="courseName"
                      value={"ectc"}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrimaryButton
                label={"Add User"}
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
          <p className={styles.subHeading}>Manage Users</p>
          <SearchField lable={"Search By Name"} handleChange={handleSearch} />
          <div>
            <TableComponent columns={tableColumns} rows={users} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
