import { React, useState } from "react";

// Styles
import styles from "./addBranches.module.css";

// Components
import TableComponent from "./components/branchTable";
import InputField from "../../components/inputField";
import PrimaryButton from "../../components/primaryButton";
import SearchField from "../../components/searchField";

import data from "./sampleData";

const tableColumns = ["Branch Name", "Action"];

const AddBranches = () => {
  const [branchName, setBranchName] = useState("");

  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted, and values are:");
    console.log(branchName);
    alert("Check console for values");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <p className={styles.heading}>Add New Branch</p>
          <form onSubmit={handleSubmit}>
            <InputField
              lable={"Branch Name"}
              placeholder={"Enter Branch Name"}
              setValue={setBranchName}
              style={{ width: "300px" }}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PrimaryButton
                label={"Add Branch"}
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
          <p className={styles.subHeading}>Manage Branches</p>
          <SearchField lable={"Search By Name"} handleChange={handleSearch} />
          <div>
            <TableComponent columns={tableColumns} rows={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBranches;
