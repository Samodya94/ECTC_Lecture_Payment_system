import { useEffect, useState } from "react";
import { PendingCoverages } from "./component/pending_coverages";
import { RejectedCoverages } from "./component/rejected_coverages";
import { useLecAuthContext } from "../../../hooks/useLecAuthContext";
import Service from "../../../utilities/Service";
import { useNavigate } from "react-router";

// import './lec.css'
export const AddLectureCoverage = () => {
  const [lecName, setLecName] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [batchCode, setBatchCode] = useState("");
  const [stime, setStime] = useState("");
  const [etime, setEtime] = useState("");
  const [course, setCourse] = useState("");
  const [duration, setDuratuion] = useState("");
  const [date, setDate] = useState("");
  const [coverage, setCoverage] = useState("");
  const [seconds, setSeconds] = useState(0);
  const { lecturer } = useLecAuthContext();
  const [remHours, setRemHours] = useState("");
  const [updateremHours, setUpdateremHours] = useState(0);
  const [batches, setBatches] = useState([]);
  const [assgbatch, setAssgBatches] = useState([]);
  

  const [refreshPendingCoverages, setRefreshPendingCoverages] = useState(false);
  const [refreshRejectedCoverages, setRefreshRejectedCoverages] = useState(false);
  const service = new Service();
  const navigate = useNavigate() 

  useEffect(() => {
    getLecturer();
    getAssignedBatches();
    calculateTimeDifference();
    getdata();
    calculateRemHours()
  }, [lecturer,refreshPendingCoverages]);

  useEffect(()=>{
    triggerRefresh();
  },[])


 function getdata() {
    const response = service.get("batch");
    response.then((res) => {
      const batchcodee = res.data.reduce((ace, batch) => {
        ace[batch._id] = batch.batchCode;
        return ace;
        
      }, {});
      setAssgBatches(batchcodee);
    });
  }

  useEffect(() => {
    getHours();
  }, [batchCode]);

  useEffect(() => {
    calculateTimeDifference();
    calculateRemHours()  
  });

  function calculateRemHours() {
    if (seconds && duration) {
      const ms = seconds - duration;
      setUpdateremHours (ms);
    }
  }

const getHours = () => {
    const id = batchCode;
    const response = service.get(`assignbatch/assigncode`, id);
    response
      .then((res) => {
        const ms = res.data.remaining_hours;
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const remTime = hours + " Hours and " + minutes + " minutes remaining";
        setRemHours(remTime);
        setCourse(res.data.course);
        setSeconds(ms);

        return hours + " Hours and" + minutes + "minutes remaining";
      })
      .catch((error) => {
        console.log(error, "Failed to Fetch information");
      });
  };

  const getLecturer = (e) => {
    if (lecturer) {
      const id = lecturer.id;

      const response = service.get(`lecturer/${id}`);
      response
        .then((res) => {

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

  const calculateTimeDifference = () => {
    if (stime && etime) {
      const startTime = new Date(`1970-01-01T${stime}`);
      const endTime = new Date(`1970-01-01T${etime}`);
      const timeDiffInMillis = endTime - startTime;
      // Convert time difference to hours and minutes
      const hours = Math.floor(timeDiffInMillis / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeDiffInMillis % (1000 * 60 * 60)) / (1000 * 60)
      );
      setDuratuion(timeDiffInMillis);
      console.log(timeDiffInMillis)
    }
  };

    const handleSubmit = async (e) => {

    navigate('../add_coverages');
    e.preventDefault();
    
    
   console.log(updateremHours)
    setRefreshPendingCoverages((prev) => !prev);
    setRefreshRejectedCoverages((prev) => !prev);

    const lecid = lecturer.id;
    const data = {
      lectureid: lecid,
      courseName: course,
      batchCode: batchCode,
      startTime: stime,
      endTime: etime,
      duration: duration,
      date: date,
      lectureCoverage: coverage,
    };
    console.log(batchCode)
    const respone = service.post("coverage", data);
    respone
      .then((res) => {
        console.log(res);
        alert("Coverage Added");
        const data = {
          remaining_hours:updateremHours
        }
        const response1 = service.put('assignbatch/bcode',batchCode,data)
        response1.then(()=>{
          console.log("updated");
          
        }) 
      })
      .catch((error) => {
        alert(error.message)
      });
  };

  const triggerRefresh = () => {
    setRefreshPendingCoverages((prev) => !prev);
    setRefreshPendingCoverages((prev) => !prev);
    setRefreshRejectedCoverages((prev) => !prev);
  };

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
                value={fname + " " + lname}
                onChange={(e) => {
                  setLecName(e.target.value);
                }}
                required
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
                  calculateRemHours()
                  console.log(batchCode);
                }}
                required
              >
                <option> --Select Batch-- </option>
                {batches.map((batch) => (
                  <option key={batch._id} value={batch.batchCode}>
                    {assgbatch[batch.batchCode]}
                  </option>
                ))}
              </select>
              {batchCode ? remHours : ""}
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
                onChange={(e) => {
                  setStime(e.target.value);
                  calculateRemHours()
                }}
                required
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
                  setEtime(e.target.value);
                  calculateRemHours()
                }}
                required
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
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                required
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
                onChange={(e) => {
                  setCoverage(e.target.value);
                }}
                required
              >
               
              </textarea>
            </div>
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-6">
            <div className="input_fields my-2">
              <button className="btn btn-primary">Add Coverage</button>
            </div>
            &nbsp;
          </div>
        </div>
      </form>
      <div className="my-2">
        <PendingCoverages refresh={refreshPendingCoverages} triggerRefresh={triggerRefresh} />

      </div>
      <div className="my-2">
        <RejectedCoverages refresh={refreshRejectedCoverages} />
      </div>
    </div>
  );
};
