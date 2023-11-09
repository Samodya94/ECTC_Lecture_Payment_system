import { Link } from "react-router-dom";
import logo from "../../../assets/logo.jpg";
import { AiFillHome } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { FaTableList,FaKey,FaBars } from "react-icons/fa6";
import { BsFillEyeFill } from "react-icons/bs";
const LecSideNav = () => {
  return (
    <div>
      <div className="logo-lecsidenav">
        <img src={logo} />
      </div>
      <div className="middle-content">
        <div className="sidenav_link"><Link to="dash"><AiFillHome/> &nbsp; Home</Link></div>
        <div className="sidenav_link"><Link to="add_coverage"><FaPlus/> &nbsp; Add Lecture Coverage</Link></div>
        <div className="sidenav_link"><Link to="Coverage_History"><FaTableList/> &nbsp; Lecture Coverages</Link></div>
        <div className="sidenav_link"><Link to="lec_pay_history"><BsFillEyeFill/> &nbsp; Payment History</Link></div>
        <div className="sidenav_link"><Link to="change_password"><FaKey/> &nbsp; Change Password</Link></div>
      </div>
    </div>
  );
};

export default LecSideNav;
