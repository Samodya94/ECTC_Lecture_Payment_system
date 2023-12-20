import { React, useState, useCallback, useEffect, useMemo } from "react";

// Styles
import styles from "./addBranches.module.css";

// Components
import TableComponent from "./components/branchTable";
import InputField from "../../components/inputField";
import PrimaryButton from "../../components/primaryButton";
import SearchField from "../../components/searchField";
import Service from "../../../../utilities/httpService";


import data from "./sampleData";

const tableColumns = ["Branch Name", "Action"];


const AddBranches = () => {
  const [branchName, setBranchName] = useState("");

  const [search, setSearch] = useState("");
  const [branches, setBranches] = useState([]);
  const service = useMemo(() => new Service(), []);


  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      getBranches();
    } else {
      const filteredBranches = branches.filter((branch) =>
        branch.branchName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setBranches(filteredBranches);
    }
  };

  const getBranches = useCallback(() => {
    const response = service.get(`branch/`);
    response
      .then((res) => {
        setBranches(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [service]);

  useEffect(() => {
    getBranches();

  }, [getBranches]);

  //new branch 
  const newBranch = {
    branchName: branchName,


  };

  //create new branch function
  function createBranch(e) {
    e.preventDefault();
    if (branchName === "") {
      alert("Please fill all the fields");
      return;
    }
    const response = service.post(`branch/`, newBranch);
    response.then((res) => {
      alert("New Branch Added");
      window.location.reload();
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <p className={styles.heading}>Add New Branch</p>
          <form onSubmit={createBranch}>
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
            <TableComponent columns={tableColumns} rows={branches} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBranches;
