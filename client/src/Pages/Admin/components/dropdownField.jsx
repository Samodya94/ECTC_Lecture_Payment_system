import React from "react";

// Styles
import styles from "./styles/dropdownField.module.css";

const DropdownField = ({
  lable,
  selectedBranch,
  handleOptionChange,
  style,
  list,
}) => {
  return (
    <>
      <div className={styles.container}>
        <label htmlFor="courseName" className={styles.lable}>
          {lable}:
        </label>
        <select
          id="course"
          name="course"
          value={selectedBranch}
          onChange={handleOptionChange}
          className={styles.dropdown}
          style={style}
        >
          <option value="" disabled className={styles.defaultOption}>
            Please Select
          </option>
          {list.map((single) => (
            <option key={single._id} value={single._id}>
              {single.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default DropdownField;
