import React from "react";
import styles from "./styles/primaryButton.module.css";

const PrimaryButton = ({ label, type, style, onClick }) => {
  return (
    <>
      <button
        className={styles.button}
        type={type}
        style={style}
        onClick={onClick}
      >
        <span>{label}</span>
      </button>
    </>
  );
};

export default PrimaryButton;
