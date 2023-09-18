import React, { useState } from "react";
import { useSelector } from 'react-redux';

import classes from './lecturecoverage.module.css';

const LectureCoverage = () => {

  
   const [date  , setDate ] = useState("");
  
   const {token} = useSelector((state) => state.auth)



  

   const handleCreateAttendances = async (e) => {
      e.preventDefault()
      console.log(`${token}`);
      try {
        

      

         //uploading attendances
         const res = await fetch(`http://localhost:8000/attendances/add`,{
            headers:{
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({
            
               date
               
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
            <h2 className={classes.title}> Lecture Coverages History</h2>
            <form onSubmit={handleCreateAttendances} encType="multipart/form-data">
              
               

                 <div className={classes.inputWrapper}>
                <label >Date :		</label>
                <input type="date" placeholder="dd/mm/yyyy" className={classes.input}
                 onChange={(e) => setDate(e.target.value)}/>
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

export default LectureCoverage