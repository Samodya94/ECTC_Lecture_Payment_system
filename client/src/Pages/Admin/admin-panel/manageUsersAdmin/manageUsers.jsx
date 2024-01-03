import { React, useEffect, useState, useMemo, useCallback } from "react";

import styles from "./manageUsers.module.css";

// Components
import TableComponent from "./components/userTable";
import TwoRowInput from "./components/twoRowInput";
import TwoRowDropdown from "./components/twoRowDropdown";
import PrimaryButton from "../../components/primaryButton";
import SearchField from "../../components/searchField";
//import PhotoUploadCard from "./components/photoUploadCard";

import Service from "../../../../utilities/httpService";

const tableColumns = [
  //"Profile Image",
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

  //const [profileImage, setProfileImage] = useState(null);

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

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


  const userLevels = [
    { _id: "Admin", name: "Admin" },
    { _id: "Manager", name: "Manager" },
    { _id: "Finance", name: "Finance" },
    { _id: "Accounts", name: "Accounts" },
  ];

  const getUsers = useCallback(() => {
    const response = service.get(`users/all`);
    response
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [service]);

  useEffect(() => {
    getUsers();

  }, [getUsers]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      getUsers();
    } else {
      const filteredUsers = users.filter((user) =>
        user.fullname.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setUsers(filteredUsers);
    }
  };


  // Handling the dropdown fields
  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleUserLevelChange = (e) => {
    setUserLevel(e.target.value);
  };

  //new user 
  const newUser = {
    fullname: fullName,
    email: email,
    branch: branch,
    username: username,
    password: "ectc",
    userLevel: userLevel,
  };

  //create new batch function
  function createUser(e) {
    e.preventDefault();
    if (fullName === "" || email === "" || branch === "" || username === "" || userLevel === "") {
      alert("Please fill all the fields");
      return;
    }
    if (!email.includes("@") || !email.includes(".") || email.split(".")[1].split(".")[0].length < 1) {
      alert("Please enter a valid email address");
      return;
    }
    const response = service.post(`users/`, newUser);
    response.then((res) => {
      alert("New User Added");
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <p className={styles.heading}>Manage Users</p>
          <form onSubmit={createUser}>
            <div className={styles.formContainer}>

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
                    list={branchListAll}
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
