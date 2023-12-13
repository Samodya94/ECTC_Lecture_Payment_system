import { useState, useEffect } from "react";
import Service from "../../../../utilities/httpService";
import { useLecAuthContext } from "../../../../hooks/useLecAuthContext";
import { Link } from "react-router-dom";

import { FaTrashCan } from "react-icons/fa6"
import { FaEdit } from "react-icons/fa"

export const PendingCoverages = ({refresh, triggerRefresh}) => {
  const [coverages, setCoverages] = useState([]);
  const { lecturer } = useLecAuthContext();
  const service = new Service();
  const [assgbatches, setAssgBatches] = useState([]);
  useEffect(() => {
    getViewCoverage();
    formatDuration();
    getdata();
  }, [lecturer,refresh]);

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

  const getViewCoverage = () => {
    if (lecturer) {
      const lecid = lecturer.id;
      const respone = service.get("coverage/lecnotApproved", lecid);
      respone
        .then((res) => {
          setCoverages(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const removeCoverage= async (id) =>{
   
    const response = service.delete('coverage',id)
    
    response.then(()=>{
      alert("Record Deleted successfully")
      triggerRefresh()
    }).catch((err)=>{
      console.log(err);
    })
  }

  const formatDuration = (milliseconds) => {
    if (!milliseconds) {
      return "No data available";
    }
    const hours = Math.floor(milliseconds / (60 * 60 * 1000));
    const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours} hr ${minutes} min`;
  };

  return (
    <div className="pending_coverage">
      <h2>Approval Pending Lecture Coverages</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Batch Code</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Lecture Duration (Hrs)</th>
            <th>Lecture Coverage</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
            {         
            coverages.map((coverage) =>(
                <tr key={coverage._id}>
                    <td>{coverage.courseName}</td>
                    <td>{assgbatches[coverage.batchCode]}</td>
                    <td>{new Date(coverage.date).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "numeric", day: "numeric" }
                  )}</td>
                    <td>{coverage.startTime}</td>
                    <td>{coverage.endTime}</td>
                    <td>{formatDuration(coverage.duration)}</td>
                    <td>{coverage.lectureCoverage}</td>
                    <td className="text-center"><div className="row p-2 text-center w-100">
                      <Link to={`../edit_coverage/${coverage._id}`} 
                        className="btn btn-primary w-25"><FaEdit/>
                      </Link>
                        <button className="btn btn-danger mx-1 w-25"
                          onClick={()=> removeCoverage(coverage._id)}
                        ><FaTrashCan/></button></div>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
