import { useEffect, useState } from "react";
import { useLecAuthContext } from "../../../../hooks/useLecAuthContext";
import Service from "../../../../utilities/httpService";

export const ViewAssignedLecturers = () => {
  const { lecturer } = useLecAuthContext();
  const service = new Service();
  

  const [batches, setBatches] = useState([]);

  useEffect(() => {
    getLecturer();
    getAssignedBatches();
  }, [lecturer]);

  

  const getLecturer = async (e) => {
    if (lecturer) {
      const id = lecturer.id;

      const response = service.get(`lecturer`, id);
      response
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error, "Failed to Fetch Lecturer information");
        });
    }
  };

  const getAssignedBatches = (e) => {
    if (lecturer) {
      const id = lecturer.id;

      const response = service.get(`assignbatch/bylecture`, id);
      response
        .then((res) => {
          console.log(res.data);
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
      <table>
        <thead>
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
        <tbody>
          {batches &&
            batches.map((batch) => (
              <tr key={batch._id}>
                <td></td>
                <td></td>
                <td>{batch.course}</td>
                <td>{batch.batchCode}</td>
                <td>{batch.rate}</td>
                <td>{batch.hours}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
