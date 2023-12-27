import { useState, useEffect } from "react";
import { useLecAuthContext } from "../../../../hooks/useLecAuthContext";
import Service from "../../../../utilities/httpService";
import { useParams } from "react-router";

export const EditCoverage = () => {

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [batchCode, setBatchCode] = useState("");
  const [stime, setStime] = useState("");
  const [etime, setEtime] = useState("");
  const [course, setCourse] = useState("");
  const [duration, setDuration] = useState("")
  const [nDuration, setnDuration] = useState('')
  const [date, setDate] = useState("");
  const [coverage, setCoverage] = useState("");
  const { lecturer } = useLecAuthContext();
  const [remHours, setRemHours] = useState();

  const [updateremHours, setUpdateremHours] = useState(0)
  const [batches, setBatches] = useState([]);
  const [batchid, setBatchid] = useState();
  const [assgbatch, setAssgBatches] = useState([]);
  const service = new Service();

  const { lecid } = useParams()

  useEffect(() => {
    getLecturer();
    GetCoverage();
    getdata();
    GetCoverage();
    getAssignedBatches();

  }, []);

  useEffect(() => {
    calculateTimeDifference();
    getBatch();
    calculateNewRemHours();
  })

  useEffect(() => {

  }, [stime, etime])



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
      const ms = duration - timeDiffInMillis
      setnDuration(ms);
      console.log(ms)
    }
  };

  const calculateNewRemHours = () => {
    const ms = parseInt(remHours, 10) + parseInt(nDuration)
    setUpdateremHours(ms)
    console.log(remHours);
  }



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
          setDuration(res.data.duration)
          setCoverage(res.data.lectureCoverage)
        })
        .catch((error) => {
          console.log(error, "Failed to Fetch Coverage information");
        });
    }
  };

  const getBatch = () => {
    const response = service.get("batch", batchCode);
    response.then((res) => {
      console.log(res.data.batchCode);
      setBatchid(res.data.batchCode);
    })
  }

  const getAssignedBatches = (e) => {
    if (lecturer) {
      const id = lecturer.id;

      const response = service.get(`assignbatch/bylecture`, id);
      response
        .then((res) => {
          console.log(res.data);
          setBatches(res.data);
          setRemHours(res.data.remaining_hours)
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
        courseName: course,
        batchCode: batchCode,
        startTime: stime,
        endTime: etime,
        duration: duration,
        date: date,
        lectureCoverage: coverage,
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

  const formatDate = (inputDate) => {
    const dateObject = new Date(inputDate);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(dateObject.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="add_coverage">
          <h1>Edit Lecture Coverages</h1>
        </div>
        <div className="row m-auto my-3">
          <div className="col-md-6 ">
            <div className="input_fields">
              Lecture Name :
              <input
                className="form-control mb-3"
                value={fname + " " + lname}
                readOnly
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="input_fields ">
              Select Batch :{batchid}
              <select
                className="form-control"
                value={batchCode}
                onChange={(e) => {
                  setBatchCode(e.target.value);
                }}
              >
                <option>--Select Batch --</option>
                {batches.map((batch) => (
                  <option key={batch._id} value={batch.batchCode}>
                    {assgbatch[batch.batchCode]}
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
                onChange={(e) => {
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
                value={formatDate(date)}
                onChange={(e) => {
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
                onChange={(e) => {
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
