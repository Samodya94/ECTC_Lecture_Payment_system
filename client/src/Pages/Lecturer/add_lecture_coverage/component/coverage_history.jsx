import { useState } from "react";
import { useLecAuthContext } from '../../../../hooks/useLecAuthContext';
import Service from '../../../../utilities/httpService'



export const Coverage_History = () => {

  const [coverages,setCoverages] = useState([]);
  const { lecturer } = useLecAuthContext()
  

  const getCoverage = async () =>{

    

  }
  
  return (
    <div className="coverage_history">
        <h2 className="">Lecture Coverage History</h2>
      <div className="row w-100 p-5">
        <div className="col-md-4 d-flex">
          <input type="month" className="form-control w-75 mx-2" />
          <button className="btn btn-primary">View</button>
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
        </table>
      </div>
    </div>
  );
};

