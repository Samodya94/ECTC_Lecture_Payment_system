import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classes from './manageBranches.module.css';

const AddBranch = () => {
   const [branchName, setBranchName] = useState("");
   const [token, setToken] = useState("");
   const [branches, setBranches] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");

   const navigate = useNavigate()

   useEffect(() => {
      // Manually set a valid token here for testing
      const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTNlODUzNzM1YzlhNWMxMGRhYjdlMyIsImlhdCI6MTY5NDAyOTEzMywiZXhwIjoxNjk2NjIxMTMzfQ.sn1qmW_tCV10Uqv3No9k2y_hjOtjYhZjjOYS0Rh-mq4";
      setToken(validToken);

      // Fetch existing branches when the component mounts
      fetchExistingBranches(validToken);
   }, []);

   const handleSearch = (e) => {
      setSearchTerm(e.target.value);
   }

   const filteredBranches = branches.filter((branch) =>
      branch.branchName.toLowerCase().includes(searchTerm.toLowerCase())
   );

   const fetchExistingBranches = async (token) => {
      try {
         const res = await fetch(`http://localhost:8000/api/branch`, {
            headers: {
               "Authorization": `Bearer ${token}`
            },
            method: "GET",
         });
         const existingBranches = await res.json();
         setBranches(existingBranches);
      } catch (error) {
         console.error(error.message);
      }
   }

   const handleCreateBranches = async (e) => {
      e.preventDefault()
      try {
         // Uploading courses
         const res = await fetch(`http://localhost:8000/api/branch`, {
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({
               branchName
            })
         });
         const ectc = await res.json();
         alert("Preferred Branch added Successfully");
         setBranchName(""); // Clear the input field
         fetchExistingBranches(token); // Refresh the list of existing branches
      } catch (error) {
         console.error(error.message);
      }
   }

   const handleRemoveBranch = async (branchId) => {
      try {
         const res = await fetch(`http://localhost:8000/api/branch/${branchId}`, {
            headers: {
               "Authorization": `Bearer ${token}`
            },
            method: "DELETE",
         });
         const result = await res.json();
         alert("Branch removed Successfully");
         fetchExistingBranches(token); // Refresh the list of existing branches
      } catch (error) {
         console.error(error.message);
      }
   }

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <h2 className={classes.title}>Manage Branches</h2>
            <form onSubmit={handleCreateBranches} encType="multipart/form-data">
               <div className={classes.inputWrapper}>
                  <label>Branch Name:</label>
                  <input
                     type="text"
                     placeholder="Enter Branch Name"
                     className={classes.input}
                     value={branchName}
                     onChange={(e) => setBranchName(e.target.value)}
                  />
               </div>

               <div className={classes.buttonWrapper}>
                  <button type="submit" className={classes.submitBtn}>
                    Add Branch
                  </button>
               </div>
            </form>

            <div className={classes.searchBar}>
               <input
                  type="text"
                  placeholder="Search Branches"
                  value={searchTerm}
                  onChange={handleSearch}
               />
            </div>

            <table className={classes.branchTable}>
               <thead>
                  <tr>
                     <th>Branch Name</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredBranches.map((branch) => (
                     <tr key={branch._id}>
                        <td>{branch.branchName}</td>
                        <td>
                           <button
                              className={classes.removeBtn}
                              onClick={() => handleRemoveBranch(branch._id)}
                           >
                              Remove
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default AddBranch;
