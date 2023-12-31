import { useEffect, useState } from "react";
import Service from "../../../utilities/Service";
import { useLecAuthContext } from "../../../hooks/useLecAuthContext";

export const Lec_Payment_History = () => {

  const [payments, setPayments] = useState([])
  const [assgbatches, setAssgBatches] = useState([]);
  const [month,setMonth] = useState('');
  const [year, setYear] = useState('');
  const { lecturer } = useLecAuthContext()
  const service = new Service();

  useEffect(()=>{
    getdata();
  },[payments])

  function getdata(){
    const response = service.get("batch");
    response.then((res)=>{
      const batchcode = res.data.reduce((ace, batch)=>{
        ace[batch._id] = batch.batchCode;
        return ace;
      },{})
      setAssgBatches(batchcode);
    })
  }

  const getpayment = async (e) =>{

    e.preventDefault()
    if(lecturer){
      const selectedMonth = new Date(month).getUTCMonth() + 1;
      let newMonth = selectedMonth
      if(selectedMonth<10){
        newMonth = "0"+selectedMonth
      }
      const selectedYear = new Date(month).getUTCFullYear();
      const lecid = lecturer.id
       
      console.log(newMonth);
      const response = service.get(`payment/lecpayMonth/${lecid}/${newMonth}/${selectedYear}`)
        response.then((res)=>{
          setPayments(res.data);
        }).catch((err)=>{
          console.log(err);
        })
       
    }
  }

  const formatDuration = (milliseconds) => {
    if (!milliseconds) {
      return "No data available";
    }
    const hours = Math.floor(milliseconds / (60 * 60 * 1000));
    const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours} hr ${minutes} min`;
  };

  const handleMonthChange = (event) => {
    // Extract the date value from the input and update the state
    const month = event.target.value;
    setMonth(month);
  };

    return (
      <div className="coverage_history">
          <h2 className="">Payment History</h2>
        <div className="row w-100 p-5">
          <div className="col-md-4 d-flex">
          <input
            type="month"
            value={month}
            className="form-control w-75 mx-2"
            onChange={handleMonthChange}
          />
            <button onClick={getpayment} className="btn btn-primary">View</button>
          </div>
        </div>
        <div className="table_components">
          <table className="table table-bordered">
            <thead>
              <tr>
              <th>Course Name</th>
                <th>Batch Code</th>
                <th>Month</th>
                <th>Total Hours</th>
                <th>Payment Rate</th>
                <th>Paid Amount</th>
              </tr>
            </thead>
            <tbody>
      {payments.map((payment) => (
        <tr key={payment._id}>
          <td>{payment.coursename}</td>
          <td>{assgbatches[payment.batchcode]}</td>
          <td>{payment.month}</td>
          <td>{formatDuration(payment.totalhours)}</td>
          <td>{payment.paymentrate}</td>
          <td>Rs.{payment.paidamount}</td>
        </tr>
      ))}
    </tbody>
  </table>
      
        </div>
      </div>
    );
  };
  
  