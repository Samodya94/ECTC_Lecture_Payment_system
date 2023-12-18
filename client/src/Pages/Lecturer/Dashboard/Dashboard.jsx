import { BsFillArrowRightCircleFill } from "react-icons/bs";

import { ViewAssignedLecturers } from "./Components/ViewAssignedBatches";
import { useState, useEffect } from "react";
import { ViewApprovedLecCov } from "./Components/ViewApprovedLecCov";
import { PendingLecture } from "./Components/PendingCoverage";

import { useLecAuthContext } from "../../../hooks/useLecAuthContext";
import Service from "../../../utilities/Service";

export const Dashboard = () => {
  const [details, setDetails] = useState();
  const [batches, setBatches] = useState([]);
  const [penCoverage, setPenCoverage] = useState([])
  const [noofBatches, setNoofBatches] = useState(0);
  const [pendingCove, setPendingCove] = useState(0);
  const [approvedCove, setApprovedCove] = useState(0)

  const { lecturer } = useLecAuthContext();
  const service = new Service();
  const [currentDate, setCurrentDate] = useState(new Date());

  //
  useEffect(() => {
    getAssignedBatches();
    getViewCoverage();
    getApprovedCoverage();
    
  }, [lecturer]);

  

  const getAssignedBatches = (e) => {
    if (lecturer) {
      const id = lecturer.id;

      const response = service.get(`assignbatch/bylecture`, id);
      response
        .then((res) => {
          setBatches(res.data);
          setNoofBatches(res.data.length)
        })
        .catch((error) => {
          console.log(error, "Failed to Fetch information");
        });
    }
  };

  const getViewCoverage = () => {
    if (lecturer) {
      const lecid = lecturer.id;
      const respone = service.get("coverage/notapprovedbymonth", lecid);
      respone
        .then((res) => {
          setPenCoverage(res.data);
          setPendingCove(res.data.length)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getApprovedCoverage = () => {
    if (lecturer) {
      const lecid = lecturer.id;
      const respone = service.get("coverage/approved", lecid);
      respone
        .then((res) => {
          setApprovedCove(res.data.length)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const currentMonth = currentDate.toLocaleString("default", { month: "short" });
  const currentYear = currentDate.getFullYear();

  function ViewAssBatches(e) {
    e.preventDefault();
    setDetails("AssignedBatches");
  }

  function ViewPending(e) {
    e.preventDefault();
    setDetails("PendingCoverages");
  }

  function ViewApproved(e) {
    e.preventDefault();
    setDetails("ApprovedCoverages");
  }

  

  return (
    <div>
      <div className="card-row">
        <div className="col-md-4">
          <div className="card">
            <div className="card_title">Assigned Batches</div>
            <div className="card_contet">
              {noofBatches < 10 ? "0"+noofBatches : noofBatches }
              <div className="card-bottom" onClick={ViewAssBatches}>
                <BsFillArrowRightCircleFill /> &nbsp; View
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card_title">Approval Pending Lectures for<br></br><b>{currentMonth} {currentYear}</b></div>
            <div className="card_contet">
              {pendingCove<10? "0"+pendingCove: pendingCove}
              <div className="card-bottom" onClick={ViewPending}>
                <BsFillArrowRightCircleFill /> &nbsp; View
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card_title">Approved Lectures </div>
            <div className="card_contet p-2"> 
              {approvedCove < 10 ? "0"+approvedCove:approvedCove}
              <div className="card-bottom" onClick={ViewApproved}>
                <BsFillArrowRightCircleFill /> &nbsp; View
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page_midrow my-5">
        {
          details ==="AssignedBatches" ?
            <ViewAssignedLecturers/> :
          details === "PendingCoverages"  ?
            <PendingLecture/>:
          details === "ApprovedCoverages" ? 
            <ViewApprovedLecCov/>:""
        }
      </div>
    </div>
  );
};
