import React from 'react'

import LecSideNav from '../../Components/Navigation/Lecturer/LecSideNav';

import './lec.css';
import LectureDashCard from '../../Components/Dashboards/lecturedashcard';

function LecHome() {
  return (
    <div>
      <div className='content'>
        <div className='sideNav' ><LecSideNav/></div>
        <div className='pgContent'><div className='cards'><LectureDashCard /></div></div>
        lec
      </div>
    </div>
  )
}

export default LecHome
