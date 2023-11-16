//Dependancies
import React, { useState } from "react";
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
import { EditCoverage } from "./add_lecture_coverage/component/Edit_coverage";
import { ChangePassword } from "./Change_Password";
import { Coverage_History } from "./add_lecture_coverage/component/coverage_history";
import { Lec_Payment_History } from "./Payments/payment_history";
import { MarkAttendance } from "./Students/MarkAttendance";
import { useLecAuthContext } from "../../hooks/useLecAuthContext"; 
import { useLecLogout } from "../../hooks/useLecLogout";
import  LectureLogin  from "./Login/LectureLogin";

function LecHome() {
  const [toggle, setToggle] = useState("show");
  const { logout } = useLecLogout();
  
  const { lecturer } = useLecAuthContext();

  function toggleMenu() {
    if (toggle === "show") {
      setToggle("hide");
    } else {
      setToggle("show");
    }
  }

  function handleLogout(e){
    e.preventDefault()

    logout()
  }

  return (
    <div>
      <div className="content">
        {lecturer? toggle === "show" ? (
          <div className="sidenav-lec">
            <LecSideNav />
          </div>
        ) : (
          <div className="min-sidenav2">
            <MiniLecSideNav />
          </div>
        ):""}

        {lecturer? <div className="min-sidenav">
          <MiniLecSideNav />
        </div>:""}
        <div className="lec-pg-content">
          {lecturer? <div className="topnav">
            <div className="toggle-nav">
              <button onClick={toggleMenu} className="toggle_btn">
                <FaBars />
              </button>
            </div>
            <div className="lgout">
              <button className="logout_btn" onClick={handleLogout}>
                <BsFillPersonFill /> Logout
              </button>
            </div>
          </div>:""}
          <div className="page-contents">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="text-center mt-5">
                    <h1>Select the page you want to access!</h1>
                    <p>Use the side nav</p>
                  </div>
                }
              />
              <Route path="/lec-login" element={!lecturer ?<LectureLogin/> : <Navigate to=""/>}/>
              <Route path="dash" element={<Dashboard/>} />
              <Route path="edit_coverage" element={<EditCoverage/>} />
              <Route path="add_coverage" element={<AddLectureCoverage/>} />
              <Route path="change_password" element={<ChangePassword/>}/>
              <Route path="Coverage_History" element={<Coverage_History/>}/>
              <Route path="lec_pay_history" element={<Lec_Payment_History/>}/>
              <Route path="mark_attendance" element={<MarkAttendance/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LecHome;
