import { BsFillArrowRightCircleFill } from "react-icons/bs";

import { ViewAssignedLecturers } from "./Components/ViewAssignedBatches";
import { useState, useEffect } from "react";
import { ViewApprovedLecCov } from "./Components/ViewApprovedLecCov";
import { PendingLecture } from "./Components/PendingCoverage";

import { useLecAuthContext } from "../../../hooks/useLecAuthContext";
import Service from "../../../utilities/httpService";

export const Dashboard = () => {
  const [details, setDetails] = useState();
  const [batches, setBatches] = useState([]);
  const [noofBatches, setNoofBatches] = useState(0);

  const { lecturer } = useLecAuthContext();
  const service = new Service();
  const [currentDate, setCurrentDate] = useState(new Date());

  //
  useEffect(() => {
    getAssignedBatches();
  }, [lecturer]);

  const getAssignedBatches = (e) => {
    if (lecturer) {
      const id = lecturer.id;

      const response = service.get(`assignbatch/bylecture`, id);
      response
        .then((res) => {
          console.log(res.data);
          setBatches(res.data);
          setNoofBatches(res.data.length)
        })
        .catch((error) => {
          console.log(error, "Failed to Fetch information");
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

  function ViewApproved(e) {
    e.preventDefault();
    setDetails("ApproveCove");
  }

  function ViewPending(e) {
    e.preventDefault();
    setDetails("Pending");
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
                <BsFillArrowRightCircleFill /> &nbsp; View more
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card_title">Approved Lectures <br></br><b>{currentMonth} {currentYear}</b></div>
            <div className="card_contet">
              55
              <div className="card-bottom" onClick={ViewApproved}>
                <BsFillArrowRightCircleFill /> &nbsp; View more
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card_title">Aproval Pending Lectures</div>
            <div className="card_contet">
              55
              <div className="card-bottom" onClick={ViewPending}>
                <BsFillArrowRightCircleFill /> &nbsp; View more
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page_midrow my-5">
        {details === "AssignedBatches" ? (
          <ViewAssignedLecturers />
        ) : details === "ApproveCove" ? (
          <ViewApprovedLecCov />
        ) : details === "Pending" ? (
          <PendingLecture />
        ) : null}
      </div>
    </div>
  );
};
