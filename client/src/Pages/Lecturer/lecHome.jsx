//Dependancies
import React, { useEffect, useState } from "react";
import { Routes, Route,Navigate } from "react-router-dom";

//Assets
import { FaBars } from "react-icons/fa6";
import { BsFillPersonFill } from "react-icons/bs";
import "./lec.css";
import 'bootstrap/dist/css/bootstrap.min.css';

//Routing Pages

import LecSideNav from "../../Components/Navigation/Lecturer/LecSideNav";
import MiniLecSideNav from "../../Components/Navigation/Lecturer/MiniSidenav";
import { Dashboard } from "./Dashboard/Dashboard";
import { AddLectureCoverage } from "./add_lecture_coverage/AddLectureCoverage";
import { ChangePassword } from "./Change_Password";
import { Coverage_History } from "./add_lecture_coverage/component/coverage_history";
import { Lec_Payment_History } from "./Payments/payment_history";
import { MarkAttendance } from "./Students/MarkAttendance";
import { useLecAuthContext } from "../../hooks/useLecAuthContext"; 
import { useLecLogout } from "../../hooks/useLecLogout";
import  LectureLogin  from "./Login/LectureLogin";
import { UpdateAssigncoverage } from "./add_lecture_coverage/component/updateAssigncoverage";
import Service from "../../utilities/Service";
import { EditCoverage } from "./add_lecture_coverage/component/EditCoverage";
import { ViewLog } from "./Viewlog/ViewLog";
import { AddCoverages } from "./add_lecture_coverage/component/AddCoverages";


function LecHome() {
  const [toggle, setToggle] = useState("show");
  const { logout } = useLecLogout();
  const service = new Service();
  
  const { lecturer } = useLecAuthContext();



  function toggleMenu() {
    if (toggle === "show") {
      setToggle("hide");
    } else {
      setToggle("show");
    }
  }

  useEffect(()=>{
    getLecturer();
  },[])

  const getLecturer = () =>{
    
      const id = lecturer.id
    const response = service.get(`lecturer`,id)

    response
      .then((res) =>{
        console.log(res.data);
      }).catch((error) =>{
        console.log(error)
      })
   
  }

  function handleLogout(e){
    e.preventDefault()

    logout()
  }

  return (
    <div>
      <div className="content">
        {toggle === "show" ? <div className="sidenav-lec">
            <LecSideNav /> 
          </div>
        : 
          <div className="min-sidenav2">
            <MiniLecSideNav />
          </div>
        }

         <div className="min-sidenav">
          <MiniLecSideNav />
        </div>
        <div className="lec-pg-content">
          <div className="topnav">
            <div className="toggle-nav">
              <button onClick={toggleMenu} className="toggle_btn">
                <FaBars /> 
              </button> &nbsp; 
            </div>
            <div className="lgout">
              <button className="logout_btn" onClick={handleLogout}>
                <BsFillPersonFill /> Logout
              </button>
            </div>
          </div>
          <div className="page-contents">
            <Routes>
              <Route
                path="/"
                element={<Dashboard/>}
              />
              <Route path="/lec-login" element={!lecturer ?<LectureLogin/> : <Navigate to=""/>}/>
              <Route path="dash" element={<Dashboard/>} />
              <Route path="add_coverage" element={<AddLectureCoverage/>} />
              <Route path="add_coverages" element={<AddCoverages/>}/>
              <Route path="edit_coverage/:lecid" element={<EditCoverage/>}/>
              <Route path="change_password" element={<ChangePassword/>}/>
              <Route path="Coverage_History" element={<Coverage_History/>}/>
              <Route path="lec_pay_history" element={<Lec_Payment_History/>}/>
              <Route path="mark_attendance" element={<MarkAttendance/>}/>
              <Route path="update_assignid/:id" element={<UpdateAssigncoverage/>}/>
              <Route path="view_log" element={<ViewLog/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LecHome;
