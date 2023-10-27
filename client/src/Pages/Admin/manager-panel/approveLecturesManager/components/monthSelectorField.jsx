import React from "react";

// Styles
import styles from "./dropdownField.module.css";

const MonthSelector = ({ handleDateChange, style }) => {
  return (
    <>
      <div className={styles.container}>
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
