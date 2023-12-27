import { useEffect, useState } from "react";
import { useLecAuthContext } from "../../../../hooks/useLecAuthContext";
import Service from "../../../../utilities/httpService";

export const ViewAssignedLecturers = () => {
  const { lecturer } = useLecAuthContext();
  const service = new Service();

  const [batches, setBatches] = useState([]);
  const [batchcodes,setBatchcodes] = useState([]);
  const [batched, setBatched] = useState({});
  const [batchedEnd, setBatchedEnd] = useState({});
  const [remHours, setRemHours] = useState([]);
  

  useEffect(() => {
    getLecturer();
    getAssignedBatches();
    getBatch();
  },[]);

  function getBatch() {
    const response = service.get("batch");
    response.then((res) => {
      const batchcodee = res.data.reduce((ace, batch)=>{
        ace[batch._id] = batch.batchCode;
        return ace;
      }, {})
      const batched = res.data.reduce((acc, batch) => {
        acc[batch._id] = batch.startDate;
        return acc;
      }, {});
      const batchedEnd = res.data.reduce((acco, batch) => {
        acco[batch._id] = batch.endDate;
        return acco;
      }, {});
      setBatchcodes(batchcodee)
      setBatched(batched);
      setBatchedEnd(batchedEnd);
    });
  }

  const getLecturer = async (e) => {
    if (lecturer) {
      const id = lecturer.id;

      const response = service.get(`lecturer`, id);
      response
        .then((res) => {
        })
        .catch((error) => {
          console.log(error, "Failed to Fetch Lecturer information");
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

  const getAssignedBatches = (e) => {
    if (lecturer) {
      const id = lecturer.id;

      const response = service.get(`assignbatch/bylecture`, id);
      response
        .then((res) => {
          setBatches(res.data);
        })
        .catch((error) => {
          console.log(error, "Failed to Fetch information");
        });
    }
  };

  return (
    <div className="assign_batches">
      <h1>Assigned Batches</h1>
      <table className="table table-bordered my-3">
        <thead className=" table-dark">
          <tr>
            <th>Batch Start Date</th>
            <th>Batch End Date</th>
            <th>Course Name</th>
            <th>Batch Code</th>
            <th>Payment Rate</th>
            <th>Total Hours</th>
            <th>Remaining Hours</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {batches &&
            batches.map((batch) => (
              <tr key={batch._id}>
                <td>
                  {new Date(batched[batch.batchCode]).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "numeric", day: "numeric" }
                  )}
                </td>
                <td>
                  {new Date(batchedEnd[batch.batchCode]).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "numeric", day: "numeric" }
                  )}
                </td>
                <td>{batch.course}</td>
                <td>{batchcodes[batch.batchCode]}</td>
                <td>{batch.rate}</td>
                <td>{formatDuration(batch.hours)}</td>
                <td>{formatDuration(batch.remaining_hours)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
