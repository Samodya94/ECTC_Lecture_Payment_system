import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classes from './addstudentgrade.module.css';

const AddStudentGrade = () => {

  
   const [batchcode , setBatchCode ] = useState("");
  
   const {token} = useSelector((state) => state.auth)

   const navigate = useNavigate()

  

   const handleCreateGrades = async (e) => {
      e.preventDefault()
      console.log(`${token}`);
      try {
        

      

         //uploading Grades
         const res = await fetch(`http://localhost:5000/grades/add`,{
            headers:{
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({
            
               batchcode
               
            })
         })
         const ectc = await res.json()
        
         alert("Added Successfully");
         
      } catch (error) {
         console.error(error.message)
         
      }
   }

    return(
       <div className={classes.container}>
          <div className={classes.wrapper}>
            <h2 className={classes.title}> Add student Grades</h2>
            <form onSubmit={handleCreateGrades} encType="multipart/form-data">
              
               

            <div className={classes.inputWrapper}>
                <label >Batch Code:</label>
                <input type="text" placeholder="Batch Code..." className={classes.input}
                onChange={(e) => setBatchCode(e.target.value)}/>
               </div>


               <div className={classes.buttonWrapper}>
                  <button text="submit" className={classes.submitBtn}>
                 View
                  </button>
               </div>
            </form>
          </div>
       </div>
    )
}

export default AddStudentGrade