import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classes from './addpayment.module.css';

const AddPayment = () => {

   const [coursename , setCourseName] = useState("");
   const [batchcode , setBatchCode] = useState("");
   const [ month , setMonth] = useState("");
   const [totalhours , setTotalHours] = useState("");
   const [ paymentrate , setPaymentRate ] = useState("");
   const [ paidamount , setPaidAmount] = useState("");
   const {token} = useSelector((state) => state.auth)

   const navigate = useNavigate()

  

   const handleCreatePayments = async (e) => {
      e.preventDefault()
      console.log(`${token}`);
      try {
        

      

         //uploading payments
         const res = await fetch(`http://localhost:5000/payments/add`,{
            headers:{
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({
              coursename,
               batchcode,
               month,
               totalhours,
              paymentrate,
              paidamount
            })
         })
         const ectc = await res.json()
         //navigate(`/ectc/${ectc._id}`)
         alert("Added Successfully");
         
      } catch (error) {
         console.error(error.message)
         
      }
   }

    return(
       <div className={classes.container}>
          <div className={classes.wrapper}>
            <h2 className={classes.title}>Payments History</h2>
            <form onSubmit={handleCreatePayments} encType="multipart/form-data">
               <div className={classes.inputWrapper}>
                <label >Course Name :</label>
                <input type="text" placeholder="Course Name..." className={classes.input}
                onChange={(e) => setCourseName(e.target.value)}/>
               </div>

               <div className={classes.inputWrapper}>
                <label >Batch Code:</label>
                <input type="text" placeholder="Batch Code..." className={classes.input}
                onChange={(e) => setBatchCode(e.target.value)}/>
               </div>

               <div className={classes.inputWrapper}>
                <label >Month :		</label>
                <input type="month" placeholder="month" className={classes.input}
                 onChange={(e) => setMonth(e.target.value)}/>
                 </div>

               <div className={classes.inputWrapper}>
                <label >Total Hours</label>
                <input type="number" placeholder="Total Hours..." className={classes.input}
                 onChange={(e) => setTotalHours(e.target.value)}/>
                 </div>
            

               
                <div className={classes.inputWrapper}>
                <label >Payment Rate:	</label>
                <input type="number"  placeholder="Payment Rate..." className={classes.input}
                 onChange={(e) => setPaymentRate(e.target.value)}/>
                 </div>

              
                 

                 <div className={classes.inputWrapper}>
                <label >Paid Amount :</label>
                <input type="number" placeholder="Paid Amount ..." className={classes.input}
                onChange={(e) => setPaidAmount(e.target.value)}/>
               </div>

               <div className={classes.buttonWrapper}>
                  <button text="submit" className={classes.submitBtn}>
                    Add Payment
                  </button>
               </div>
            </form>
          </div>
       </div>
    )
}

export default AddPayment