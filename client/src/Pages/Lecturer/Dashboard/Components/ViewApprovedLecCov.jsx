import { useState, useEffect } from "react";
import Service from "../../../../utilities/httpService";
import { useLecAuthContext } from "../../../../hooks/useLecAuthContext";

export const ViewApprovedLecCov = () => {
  const [coverages, setCoverages] = useState([]);
  const { lecturer } = useLecAuthContext();
  const service = new Service();
  const [batched, setBatched] = useState({});

  useEffect(() => {
    getViewCoverage();
    getBatch();
  }, [lecturer]);

  function getBatch() {
    const response = service.get("assignbatch");
    response.then((res) => {
      const batches = res.data.reduce((acc, batch) => {
        acc[batch._id] = batch.batchCode;
        return acc;
      }, {});
      setBatched(batches);
      
    });
  }

  const getViewCoverage = () => {
    if (lecturer) {
      const lecid = lecturer.id;
      const respone = service.get("coverage/approved", lecid);
      respone
        .then((res) => {
          console.log(res.data);
          setCoverages(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const formatDuration = (milliseconds) => {
    if (!milliseconds) {
      return "No data available";
    }
    const hours = Math.floor(milliseconds / (60 * 60 * 1000));
    const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
    return `${hours} hr ${minutes} min`;
  };

  
  return (
    <div className="assign_batches">
      <h1>Pending Lectures</h1>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Batch Code</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Lecture Duration</th>
            <th>Lecture Coverage</th>
          </tr>
        </thead>
        <tbody>
          {coverages.map((coverage) => (
            <tr key={coverage._id}>
              <td>{coverage.courseName}</td>
              <td>{batched[coverage.batchCode]}</td>
              <td> {new Date(coverage.date).toLocaleDateString(
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
  );
};
