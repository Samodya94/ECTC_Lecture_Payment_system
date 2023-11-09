import { Link } from "react-router-dom";
import logo from "../../../assets/logo.jpg";
import { AiFillHome } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { FaTableList,FaKey,FaBars } from "react-icons/fa6";
import { BsFillEyeFill } from "react-icons/bs";
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
        <div className="sidenav_link1"><Link to=""><BsFillEyeFill/></Link></div>
        <div className="sidenav_link1"><Link to="change_password"><FaKey/></Link></div>
      </div>
    </div>
  );
};

export default MiniLecSideNav;
