import React from "react";

// Styles
import styles from "./header.module.css";

// MUI icons
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Header = ({ setExpanded, expanded }) => {
  const toggleNav = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.toggleButton} onClick={toggleNav}>
          <MenuOutlinedIcon />
        </div>
        Header
      </div>
    </>
  );
};

export default Header;
