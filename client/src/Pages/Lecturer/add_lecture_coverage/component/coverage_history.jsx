import { useState,useEffect } from "react";
import Service from "../../../../utilities/httpService";
import { useLecAuthContext } from "../../../../hooks/useLecAuthContext";


export const Coverage_History = () => {

  const [coverages,setCoverages] = useState([]);
  const [month,setMonth] = useState('');
  const [year, setYear] = useState('');
  const { lecturer } = useLecAuthContext()
  const service = new Service();

  // useEffect(()=>{
  //   getCoverage();
  // },[lecturer])

  const getCoverage = async (e) =>{

    e.preventDefault()
    if(lecturer){
      const selectedMonth = new Date(month).getUTCMonth() + 1;
      const selectedYear = new Date(month).getUTCFullYear();
      const lecid = lecturer.id
       

      const response = service.get(`coverage/leccoverageHistory/${lecid}/${selectedMonth}/${selectedYear}`)
        response.then((res)=>{
          console.log(res.data);
        }).catch((err)=>{
          console.log(err)
        })
        console.log(selectedMonth)
        console.log(selectedYear)
    }
   

  }

  const handleMonthChange = (event) => {
    // Extract the date value from the input and update the state
    const month = event.target.value;
    setMonth(month);
  };

    return (
    <div className="coverage_history">
        <h2 className="">Lecture Coverage History</h2>
      <div className="row w-100 p-5">
        <div className="col-md-4 d-flex">
        <input
            type="month"
            value={month}
            className="form-control w-75 mx-2"
            onChange={handleMonthChange}
          />
          
          <button onClick={getCoverage} className="btn btn-primary">View</button>
        </div>
      </div>
      <div className="table_components">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Batch Code</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
              <th>Lecture Coverage</th>
            </tr>
          </thead>
          <tbody>
            {coverages ? "": "No Data Available"}
          </tbody>
        </table>
      </div>
    </div>
  );
};

