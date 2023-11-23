import { useEffect, useState } from "react";
import { useLecAuthContext } from "../../../hooks/useLecAuthContext";
import Service from "../../../utilities/httpService";

export const MarkAttendance = () => {
  const [batches, setBatches] = useState([]);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [batchCode,setBatchCode] = useState("")
  const [hr, setHr] = useState(0);
  const [date, setDate] = useState("");
  const [stime, setStime] = useState("");
  const [etime, setEtime] = useState("");
  const [coverage, setCoverage] = useState("");

  const { lecturer } = useLecAuthContext();
  const service = new Service();

  //
  useEffect(() => {
    getLecturer();
    getAssignedBatches();
  
  },[lecturer]);

  const getLecturer = async (e) => {
    if (lecturer) {
      const id = lecturer.id;

      const response = service.get(`lecturer`,id);
      response
        .then((res) => {
          console.log(res.data);
          setFname(res.data.firstName);
          setLname(res.data.lastName);
        })
        .catch((error) => {
          console.log(error, "Failed to Fetch Lecturer information");
        });
    }
  };

  const getAssignedBatches = (e) => {
    if (lecturer) {
      const id = lecturer.id;

      const response = service.get(`assignbatch/bylecture`,id);
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

  useEffect(() => {
    getBatch();
  }, [batchCode]);

  const getBatch= async () =>{
    if (lecturer && batchCode) {
        try {
          const response = await service.get(`assignbatch/`, batchCode);
          console.log(response.data);
          setHr(response.data.hours);
        } catch (error) {
          console.log(error, "Failed to Fetch Lecturer information");
        }
      }
  }
  

  
  return (
    <div className="mark_attendance">
    <h1>Student Attendance</h1>
      <form className="w-50 m-auto my-4">
        <div className="row my-4">
          <div className="col-md-6">
            <label>Lecturer Name:</label>
            <input
              type="text"
              disabled
              value={fname + " " + lname}
              onChange={(e) => {}}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label>Batch Code:</label>
            <select
              className="form-control"  
                value={batchCode}
                onChange={(e) => {setBatchCode(e.target.value)
                }
                    
                }
             >
              <option> --Select Batch-- </option>
              {batches.map((batch) => (
                <option key={batch._id} value={batch._id}>
                    {batch.batchCode}
                    
                </option>
              ))}

              
            </select>
            {batchCode ? hr : ""}
          </div>
        </div>
        <div className="row my-4">
          <div className="col-md-6 ">
            <label>Start Time:</label>
            <input 
              type="time" 
              className="form-control"
              value={stime}
              onChange={(e)=>{
                setStime(e.target.value)
              }} />
          </div>
          <div className="col-md-6">
            <label>End-time:</label>
            <input 
              type="time" 
              className="form-control"
              value={etime}
              onChange={(e)=>{
                setEtime(e.target.value)
              }}
               />
          </div>
        </div>
        <div className="row my-4">
          <div className="col-md-6">
            <label>Date:</label>
            <input type="date"
             className="form-control"
             value={date}
             onChange={(e)=>{
              setDate(e.target.value)
             }}
              />
          </div>
          <div className="col-md-6">
            <label>Coverage:</label>
            <textarea 
              className="form-control"
              value={coverage}
              onChange={(e)=>{
                setCoverage(e.target.value)
              }}
              ></textarea>
          </div>
        </div>

        <button className="btn btn-primary">
          <b>Mark Attendance</b>
        </button>
      </form>

      <div className="view_student w-75 p-5">
      <table className="table table-bordered">
          <thead>
            <tr>
              <td>Student Name</td>
              <td>Mark Attendance</td>
              <td>Attendace</td>
              <td>Action</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};
