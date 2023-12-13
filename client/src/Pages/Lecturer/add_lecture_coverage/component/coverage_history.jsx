import { useState,useEffect } from "react";
import Service from "../../../../utilities/httpService";
import { useLecAuthContext } from "../../../../hooks/useLecAuthContext";


export const Coverage_History = () => {

  const [coverages,setCoverages] = useState([]);
  const [month,setMonth] = useState('');
  const [year, setYear] = useState('');
  const [assgbatches, setAssgBatches] = useState([]);
  const { lecturer } = useLecAuthContext()
  const service = new Service();

  useEffect(()=>{
    getdata();
  },[coverages])

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

  const getCoverage = async (e) =>{

    e.preventDefault()
    if(lecturer){
      const selectedMonth = new Date(month).getUTCMonth() + 1;
      const selectedYear = new Date(month).getUTCFullYear();
      const lecid = lecturer.id
       

      const response = service.get(`coverage/leccoverageHistory/${lecid}/${selectedMonth}/${selectedYear}`)
        response.then((res)=>{
          console.log(res.data);
          setCoverages(res.data)
        }).catch((err)=>{
          console.log(err)
        })
        console.log(selectedMonth)
        console.log(selectedYear)
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
            {         
            coverages.map((coverage) =>(
                <tr key={coverage._id}>
                    <td>{assgbatches[coverage.batchCode]}</td>
                    <td>{new Date(coverage.date).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "numeric", day: "numeric" }
                  )}</td>
                    <td>{coverage.startTime}</td>
                    <td>{coverage.endTime}</td>
                    <td>{formatDuration(coverage.duration)}</td>
                    <td>{coverage.lectureCoverage}</td>
                    
                </tr>
            ))}
        </tbody>
        </table>
      </div>
    </div>
  );
};

