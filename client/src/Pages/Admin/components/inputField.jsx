import React from "react";

// Styles
import styles from "./styles/inputField.module.css";

const InputField = ({ lable, placeholder, setValue, style }) => {
  return (
    <>
      <div className={styles.container}>
        <label className={styles.lable}>{lable}:</label>
        <input
          type="text"
          className={styles.inputField}
          id="courseName"
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          style={style}
        />
      </div>
    </>
  );
};

export default InputField;
