import React from "react";

// Styles
import styles from "./twoRowInput.module.css";

const TwoRowInput = ({ lable, placeholder, setValue, style }) => {
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

export default TwoRowInput;
