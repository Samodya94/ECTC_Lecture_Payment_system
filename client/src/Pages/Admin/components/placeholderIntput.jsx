import React from "react";
import styles from "./styles/placeholderInput.module.css";

const InputField = ({ label, style, type, handleChange }) => {
  return (
    <>
      <div className={styles.container}>
        <input
          placeholder={label}
          className={styles.input}
          style={style}
          type={type}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default InputField;
