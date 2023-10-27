import React from 'react'

import { Link } from "react-router-dom";

import './lec.css'

function LecSideNav() {
  return (
    <div>
      <div className='logo'></div>
      <div className='nav'>
        <ul>
            <li><Link to={"/lecindex"}><i className='fas fa-home'></i> Home</Link></li>
            <li><Link to={"/"}><i className='fa fa-plus'></i> Add Lecture Coverage</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default LecSideNav
