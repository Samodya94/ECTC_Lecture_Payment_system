import React from "react";
import styles from "./styles/primaryButton.module.css";

const PrimaryButton = ({ label, type, style }) => {
  return (
    <>
      <button className={styles.button} type={type} style={style}>
        <span>{label}</span>
      </button>
    </>
  );
};

export default PrimaryButton;
