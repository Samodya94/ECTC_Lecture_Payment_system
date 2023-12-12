import { Link } from "react-router-dom";
import logo from "../../../assets/logo.jpg";
import { AiFillHome } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import { FaTableList,FaKey,FaBars } from "react-icons/fa6";
import { BsFillEyeFill,BsBookFill } from "react-icons/bs";
const MiniLecSideNav = () => {
  return (
    <div>
      <div className="logo-lecsidenav">
        <img src={logo} />
      </div>
      <div className="middle-content">
        <div className="sidenav_link1"><Link to="dash"><AiFillHome/></Link></div>
        <div className="sidenav_link1"><Link to="add_coverage"><FaPlus/></Link></div>
        <div className="sidenav_link1"><Link to="Coverage_History"><FaTableList/></Link></div>
        <div className="sidenav_link1"><Link to="lec_pay_history"><BsFillEyeFill/></Link></div>
        <div className="sidenav_link1"><Link to="change_password"><FaKey/></Link></div>
        {/* <div className="sidenav_link1"><Link to="mark_attendance"><IoIosPeople /></Link></div>
        <div className="sidenav_link1"><Link to="change_password"><PiStudentBold /></Link></div> */}
        <div className="sidenav_link1"><Link to="view_log"><BsBookFill/> </Link></div>
      </div>
    </div>
  );
};

export default MiniLecSideNav;
