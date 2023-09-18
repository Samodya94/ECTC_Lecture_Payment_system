import React, { useState, useEffect } from "react";
import classes from './manageBatches.module.css';

const AddBatch = () => {
   const [batchCode, setBatchCode] = useState("");
   const [course, setCourse] = useState("");
   const [branch, setBranch] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [batchState, setBatchState] = useState("");
   const [token, setToken] = useState("");
   const [batches, setBatches] = useState([]); // State to store existing batches
   const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
   const [error, setError] = useState(null); // State to store errors

   useEffect(() => {
      // Manually set a valid token here for testing
      const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTNlODUzNzM1YzlhNWMxMGRhYjdlMyIsImlhdCI6MTY5NDAyOTEzMywiZXhwIjoxNjk2NjIxMTMzfQ.sn1qmW_tCV10Uqv3No9k2y_hjOtjYhZjjOYS0Rh-mq4";
      setToken(validToken);

      // Fetch existing batches when the component mounts
      fetchExistingBatches(validToken);
   }, []);

   const fetchExistingBatches = async (token) => {
      try {
         const res = await fetch(`http://localhost:8000/api/batch`, {
            headers: {
               "Authorization": `Bearer ${token}`
            },
            method: "GET",
         });
         const existingBatches = await res.json();
         setBatches(existingBatches);
      } catch (error) {
         console.error(error.message);
      }
   }

   const handleCreateBatch = async (e) => {
      e.preventDefault();
      try {
         if (!token) {
            throw new Error("Token is missing.");
         }

         // Uploading batches
         const res = await fetch("http://localhost:8000/api/batch", {
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({
               batchCode,
               course,
               branch,
               startDate,
               endDate,
               batchState,
            })
         });

         if (!res.ok) {
            throw new Error(`Failed to create batch: ${res.status}`);
         }

         const ectc = await res.json();
         alert("Preferred Batch added Successfully");
         setBatchCode(""); // Clear the input fields
         setCourse("");
         setBranch("");
         setStartDate("");
         setEndDate("");
         setBatchState("");
         fetchExistingBatches(token); // Refresh the list of existing batches
      } catch (error) {
         setError(error.message);
      }
   }

   const handleRemoveBatch = async (batchId) => {
      try {
         const res = await fetch(`http://localhost:8000/api/batch/${batchId}`, {
            headers: {
               "Authorization": `Bearer ${token}`
            },
            method: "DELETE",
         });
         const result = await res.json();
         alert("Batch removed Successfully");
         fetchExistingBatches(token); // Refresh the list of existing batches
      } catch (error) {
         console.error(error.message);
      }
   }

   const handleSearch = (e) => {
      setSearchTerm(e.target.value);
   }

   // Filter batches based on the search term
   const filteredBatches = batches.filter((batch) =>
      batch.batchCode.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <h2 className={classes.title}>Manage Batches</h2>
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleCreateBatch} encType="multipart/form-data">
               <div className={classes.inputWrapper}>
                  <label>Batch Code:</label>
                  <input
                     type="text"
                     placeholder="Enter Batch Code"
                     className={classes.input}
                     value={batchCode}
                     onChange={(e) => setBatchCode(e.target.value)}
                  />
               </div>

               <div className={classes.inputWrapper}>
                  <label>Course:</label>
                  <input
                     type="text"
                     placeholder="Enter Course"
                     className={classes.input}
                     value={course}
                     onChange={(e) => setCourse(e.target.value)}
                  />
               </div>

               <div className={classes.inputWrapper}>
                  <label>Branch:</label>
                  <input
                     type="text"
                     placeholder="Select Branch"
                     className={classes.input}
                     value={branch}
                     onChange={(e) => setBranch(e.target.value)}
                  />
               </div>

               <div className={classes.inputWrapper}>
                  <label>Start Date:</label>
                  <input
                     type="Date"
                     placeholder="Select Start Date"
                     className={classes.input}
                     value={startDate}
                     onChange={(e) => setStartDate(e.target.value)}
                  />
               </div>

               <div className={classes.inputWrapper}>
                  <label>End Date:</label>
                  <input
                     type="Date"
                     placeholder="Select End Date"
                     className={classes.input}
                     value={endDate}
                     onChange={(e) => setEndDate(e.target.value)}
                  />
               </div>

               <div className={classes.inputWrapper}>
                  <label>Batch State:</label>
                  <input
                     type="text"
                     placeholder="Select Batch State"
                     className={classes.input}
                     value={batchState}
                     onChange={(e) => setBatchState(e.target.value)}
                  />
               </div>

               <div className={classes.buttonWrapper}>
                  <button type="submit" className={classes.submitBtn}>
                    Add Batch
                  </button>
               </div>
            </form>

            {/* Search bar */}
            <div className={classes.searchBar}>
               <input
                  type="text"
                  placeholder="Search Batches"
                  value={searchTerm}
                  onChange={handleSearch}
               />
            </div>

            {/* Table displaying existing batches */}
            <table className={classes.batchTable}>
               <thead>
                  <tr>
                     <th>Batch Code</th>
                     <th>Course</th>
                     <th>Branch</th>
                     <th>Start Date</th>
                     <th>End Date</th>
                     <th>Batch State</th>
                     <th>Action</th> {/* Added a new column for Remove buttons */}
                  </tr>
               </thead>
               <tbody>
                  {filteredBatches.map((batch) => (
                     <tr key={batch._id}>
                        <td>{batch.batchCode}</td>
                        <td>{batch.course}</td>
                        <td>{batch.branch}</td>
                        <td>{batch.startDate}</td>
                        <td>{batch.endDate}</td>
                        <td>{batch.batchState}</td>
                        <td>
                           <button
                              className={classes.removeBtn}
                              onClick={() => handleRemoveBatch(batch._id)}
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

export default AddBatch;
