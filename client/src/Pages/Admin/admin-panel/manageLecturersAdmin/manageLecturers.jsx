import { React, useState } from "react";

// Styles
import styles from "./manageLecturers.module.css";

// Components
import TableComponent from "./components/lecturerTable";
import InputField from "../../components/inputField";
import PrimaryButton from "../../components/primaryButton";
import SearchField from "../../components/searchField";
import DropdownField from "../../components/dropdownField";

// Sample data for table
import data from "./sampleData";

const tableColumns = [
  "Name",
  "Username",
  "NIC",
  "Email",
  "Phone Number",
  "Branch",
  "Registered Date",
  "Action",
];

const ManageLecturers = () => {
  const [NIC, setNIC] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [branch, setBranch] = useState("");
  const registerDate = new Date().toLocaleDateString();

  const [search, setSearch] = useState("");

  const branchList = [
    { _id: "1", name: "Malabe" },
    { _id: "2", name: "Metro" },
    { _id: "3", name: "Kandy" },
  ];

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted, and values are:");
    console.log(
      NIC,
      username,
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      branch,
      registerDate
    );
    alert("Check console for values");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <p className={styles.heading}>Lecturer Registration</p>
          <form onSubmit={handleSubmit}>
            <InputField
              lable={"NIC"}
              placeholder={"Enter NIC"}
              setValue={setNIC}
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
              setValue={setEmailAddress}
              style={{ width: "300px" }}
            />
            <InputField
              lable={"Phone Number"}
              placeholder={"Enter Phone Number"}
              setValue={setPhoneNumber}
              style={{ width: "300px" }}
            />
            <DropdownField
              lable={"Branch"}
              list={branchList}
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
            <TableComponent columns={tableColumns} rows={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageLecturers;
