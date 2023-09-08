import React, { useState } from "react";
import classes from './navbar.module.css'
import { Link, useNavigate } from "react-router-dom";

import {useDispatch} from 'react-redux'
import {logout} from '../../redux/authSlice'

const Navbar = () => {

    const[isScrolled,setIsScrolled] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch()

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.scroll = null)
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return(
       <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
        <div className={classes.wrapper}>
            <div className={classes.left}>
               <Link to='/' className={classes.title}>
                ECTC
               </Link>
            </div>
            <div className={classes.center}>
                <ul className={classes.list}>
                    <li className={classes.listItem}>
                        <a href="/">Dashboard</a>
                    </li>
                    <li className={classes.listItem}>
                        <Link to='/addlecturecoverage'>AddLectureCoverage</Link>
                    </li>
                    <li className={classes.listItem}>
                        <Link to='/lecturecoverage'>LectureCoverage</Link>
                    </li>

                    <li className={classes.listItem}>
                        <Link to='/addpayment'>paymenthistory</Link>
                    </li>

                

                    <li className={classes.listItem}>
                        <Link to='/addstudentattendance'>StudentAttendance</Link>
                    </li>

                    <li className={classes.listItem}>
                        <Link to='/addstudentgrade'>StudentGrade</Link>
                    </li>


                   

                 
                  
                </ul>
            </div>
            <div className={classes.right}>
              
             
                <button onClick={handleLogout} className={classes.logout}>Logout</button>
            </div>
        </div>
       </div>
    )
}

export default Navbar