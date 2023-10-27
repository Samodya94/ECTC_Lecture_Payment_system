import { React, useState } from "react";
import Cookies from "js-cookie";
// Styles
import styles from "./header.module.css";

// MUI icons
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

// Components
import DropdownCard from "./components/dropdownCard";

const Header = ({ setExpanded, expanded }) => {
  const [profileExpanded, setProfileExpanded] = useState(false);

  const toggleNav = () => {
    setExpanded(!expanded);
  };

  const username = Cookies.get("username");
  const userLevel = Cookies.get("userLevel");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.toggleButton} onClick={toggleNav}>
          <MenuOutlinedIcon className={styles.svg} />
        </div>
        <div
          className={styles.logStatus}
          onClick={() => setProfileExpanded(!profileExpanded)}
        >
          <div className={styles.profileImageContainer}>
            <img src="https://i.pravatar.cc/300" alt="User Profile" />
          </div>
          <p className={styles.usernameTxt}>{username} ({userLevel})</p>
          {profileExpanded ? (
            <span className={styles.span}>&#9650;</span>
          ) : (
            <span className={styles.span}>&#9660;</span>
          )}
        </div>
        <div
          className={styles.logStatusMobile}
          onClick={() => setProfileExpanded(!profileExpanded)}
        >
          <div className={styles.profileImageContainer}>
            <img src="https://i.pravatar.cc/300" alt="User Profile" />
          </div>
          {profileExpanded ? (
            <span className={styles.span1}>&#9650;</span>
          ) : (
            <span className={styles.span1}>&#9660;</span>
          )}
        </div>
      </div>

      {profileExpanded && <DropdownCard />}
    </>
  );
};

export default Header;
