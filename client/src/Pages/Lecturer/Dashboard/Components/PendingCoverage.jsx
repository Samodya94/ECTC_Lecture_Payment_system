import { useState, useEffect } from "react";
import Service from "../../../../utilities/Service";
import { useLecAuthContext } from "../../../../hooks/useLecAuthContext";

export const PendingLecture = () => {
  const [coverages, setCoverages] = useState([]);
  const { lecturer } = useLecAuthContext();
  const service = new Service();
  const [batched, setBatched] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [batchcodes,setBatchcodes] = useState([]);


  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    getViewCoverage();
    getBatch();
    getdata();
  }, [lecturer]);

  function getdata(){
    const response = service.get("batch");
    response.then((res)=>{
      const batchcodee = res.data.reduce((ace, batch)=>{
        ace[batch._id] = batch.batchCode;
        return ace;
      },{})
      setBatchcodes(batchcodee);
    })
  }

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

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
      const respone = service.get("coverage/notapprovedbymonth", lecid);
      respone
        .then((res) => {
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
      <h1>Approval Pending Lectures for {currentMonth} of {currentYear}</h1>
      <table className="table table-striped">
        <thead className=" table-dark">
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
              <td>{batchcodes[coverage.batchCode]}</td>
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
