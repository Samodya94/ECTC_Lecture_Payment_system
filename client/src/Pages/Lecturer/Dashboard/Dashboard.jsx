import { BsFillArrowRightCircleFill } from "react-icons/bs";

import { ViewAssignedLecturers } from "./Components/ViewAssignedBatches";
import { useState } from "react";
import { ViewApprovedLecCov } from "./Components/ViewApprovedLecCov";
import { PendingLecture } from "./Components/PendingCoverage";

export const Dashboard = () => {

    const [details,setDetails] = useState();

    function ViewAssBatches(e){
        e.preventDefault()
        setDetails('AssignedBatches')
    }

    function ViewApproved(e){
        e.preventDefault()
        setDetails('ApproveCove')
    }

    function ViewPending(e){
        e.preventDefault()
        setDetails('Pending')
    }

  return (
    <div>
      <div className="card-row">
        <div className="col-md-4">
          <div className="card">
            <div className="card_title">Assigned Batches</div>
            <div className="card_contet">
              55
              <div className="card-bottom" onClick={ViewAssBatches}>
                <BsFillArrowRightCircleFill /> &nbsp; View more
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card_title">Approved Lectures - oct-2023</div>
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
      <div className="page_midrow">
        {
            details==='AssignedBatches'?<ViewAssignedLecturers/>: 
            details==='ApproveCove' ? <ViewApprovedLecCov/>:
            details==="Pending"? <PendingLecture/>:null
        }
      </div>
      
    </div>
  );
};
