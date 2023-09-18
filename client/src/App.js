import './App.css';
import {Routes,Route} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';

import Lec_Navbar from './components/lecturer_navbar/Lec_Navbar';
import Lec_Footer from './components/lecturer_footer/Lec_Footer';
import Lec_Home from './components/lecturer_home/Lec_Home';
import Create from './components/lecturer_create/Create';

import AddLectureCoverage from './components/Lecturer_addlecturecoverage/AddLectureCoverage';
import AddPayment from './components/lecturer_addpayment/AddPayment';
import AddStudentAttendance from './components/lecturer_addstudentattendance/AddStudentAttendance';
import AddStudentGrade from './components/lecturer_addstudentgrade/AddStudentGrade';
import LectureCoverage from './components/lecturer_lecturecoverage/LectureCoverage';
import CoverageTable from './components/lecturer_viewlecturecoverage/CoverageTable';


import AddCourse from './components/manageCourses/ManageCourses';
import AddBranch from './components/manageBranches/ManageBranches';
import AddBatch from './components/manageBatches/ManageBatches';
import AddUsers from './components/manageUsers/ManageUsers';

import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import {useLocation} from 'react-router-dom'
import { useEffect } from 'react';

import Lec_Login from './components/lecturer_login/Lec_Login';
import Lec_Signup from './components/lecturer_signup/Lec_Signup';

function App() {

  const location = useLocation()
 
 useEffect(() => {
   window.scrollTo(0, 0)
 }, [location.pathname])

  return (
    <div>
      <Navbar/>
      <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/courses' element={<AddCourse/>}></Route>
          <Route path='/branches' element={<AddBranch/>}></Route>
          <Route path='/batches' element={<AddBatch/>}></Route>
          <Route path='/users' element={<AddUsers/>}></Route>
          <Route path='/users' element={<AddUsers/>}></Route>
        </Routes>
        <Footer/>

        <Lec_Navbar/>
        <Routes>
          <Route path='/lec' element={<Lec_Home/>}></Route>
          <Route path='/lec_login' element={<Lec_Login/>}></Route>
          <Route path='/lec_signup' element={<Lec_Signup/>}></Route>
          <Route path='/lec_create' element={<Create/>}></Route>
          <Route path='/lec_addlecturecoverage' element={<AddLectureCoverage/>}></Route>
          <Route path='/lec_viewlecturecoverage' element={<CoverageTable/>}></Route>
          <Route path='/lec_addstudentattendance' element={<AddStudentAttendance/>}></Route>
          <Route path='lec_/addstudentgrade' element={<AddStudentGrade/>}></Route>
          <Route path='/lec_lecturecoverage' element={<LectureCoverage/>}></Route>
          <Route path='/lec_addpayment' element={<AddPayment/>}></Route>
      </Routes>
      <Lec_Footer/>
    </div>
  );
}

export default App;
