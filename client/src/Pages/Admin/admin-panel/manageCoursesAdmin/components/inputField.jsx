import React from "react";

// Styles
import styles from "./inputField.module.css";

const InputField = ({ lable, placeholder, setValue, style }) => {
  return (
    <>
      <div className={styles.container}>
        <label htmlFor="courseName" className={styles.lable}>
          {lable}:
        </label>
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
