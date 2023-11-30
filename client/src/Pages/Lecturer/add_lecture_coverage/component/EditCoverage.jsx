import { useState, useEffect } from "react";
import { useLecAuthContext } from "../../../../hooks/useLecAuthContext";
import Service from "../../../../utilities/httpService";
import { useParams } from "react-router";

export const EditCoverage = () => {

    const [lecName, setLecName] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [batchCode, setBatchCode] = useState("");
    const [stime, setStime] = useState("");
    const [etime, setEtime] = useState("");
    const [course, setCourse] = useState("");
    const [duration, setDuratuion] = useState("")
    const [date, setDate] = useState("");
    const [coverage, setCoverage] = useState("");
    const [seconds, setSeconds] = useState(0);
    const { lecturer } = useLecAuthContext();
    const [remHours, setRemHours] = useState();
    const [updateremHours, setUpdateremHours] = useState(0)
    const [batches, setBatches] = useState([]);
    const service = new Service();

    const { lecid } = useParams()

  useEffect(() => {
    getLecturer();
    getAssignedBatches();
    
  }, [lecturer]);

  useEffect(()=>{
    GetCoverage();
  })

  const getLecturer = (e) => {
    if (lecturer) {
      const id = lecturer.id;
        
      const response = service.get(`lecturer/${id}`);
      response
        .then((res) => {
          setFname(res.data.firstName);
          setLname(res.data.lastName)
        })
        .catch((error) => {
          console.log(error, "Failed to Fetch Lecturer information");
        });
    }
  };

  const GetCoverage = () => {
    if (lecturer) {
        const response = service.get(`coverage`, lecid);
        response
          .then((res) => {
            console.log(res.data);
            setBatchCode(res.data.batchCode)
            setCourse(res.data.courseName)
            setStime(res.data.startTime)
            setEtime(res.data.endTime)
            setDate(res.data.date)
            setCoverage(res.data.lectureCoverage)
          })
          .catch((error) => {
            console.log(error, "Failed to Fetch Coverage information");
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

  function handleSubmit(e) {
    e.preventDefault();

    if (lecturer) {
      const id = lecid;
      
      const data = {
        
      };
      const response = service.put(`coverage`, id, data);
      response
        .then(() => {
          alert("Coverage Updated");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="add_coverage">
          <h1>Add Lecture Coverages</h1>
        </div>
        <div className="row m-auto my-3">
          <div className="col-md-6 ">
            <div className="input_fields">
              Lecture Name :
              <input
                className="form-control mb-3"
                value={fname+" "+lname }
                readOnly
              />
            </div>
          </div>
         
          <div className="col-md-6">
            <div className="input_fields ">
              Select Batch :
              <select
                className="form-control"
                value={batchCode}
                onChange={(e) => {
                  setBatchCode(e.target.value);
                }}
              >
                <option> --Select Batch-- </option>
                {batches.map((batch) => (
                  <option key={batch._id} value={batch._id}>
                    {batch.batchCode}
                    
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row m-auto">
          <div className="col-md-6 ">
            <div className="input_fields">
              Start Time:
              <input
                className="form-control mb-3"
                type="time"
                value={stime}
                onChange={(e)=>{
                    setStime(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input_fields ">
              End Time :
              <input
                className="form-control mb-3"
                type="time"
                value={etime}
                onChange={(e) => {
                    setEtime(e.target.value)
                }}
              />
            </div>
          </div>
        </div>
        <div className="row m-auto">
          <div className="col-md-6 ">
            <div className="input_fields">
              Date :
              <input
                className="form-control mb-3"
                type="date"
                value={new Date(coverage.date).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "numeric", day: "numeric" })}
                onChange={(e)=>{
                    setDate(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input_fields ">
              Coverage :
              <textarea
                className="form-control mb-2"
                rows={2}
                value={coverage}
                onChange={(e) =>{
                    setCoverage(e.target.value)
                }}
              >
             
              </textarea>
             
            </div>
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <div className="input_fields my-2">
              <button className="btn btn-primary">Edit Coverage</button>
            </div>
            &nbsp;
          </div>
        </div>
      </form>
    </div>
  );
};
