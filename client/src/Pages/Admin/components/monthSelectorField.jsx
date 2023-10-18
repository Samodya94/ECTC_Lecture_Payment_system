import React from "react";

// Styles
import styles from "./styles/dropdownField.module.css";

const MonthSelector = ({ handleDateChange, style, lable }) => {
  return (
    <>
      <div className={styles.container}>
        {lable && (
          <label htmlFor="courseName" className={styles.lable}>
            {lable}:
          </label>
        )}
        <input
          type="text"
          name="month"
          id="month"
          onFocus={(e) => (e.target.type = "month")}
          onChange={handleDateChange}
          className={styles.dropdown}
          style={style}
          placeholder="Select a month"
        />
      </div>
    </>
  );
};

export default MonthSelector;
