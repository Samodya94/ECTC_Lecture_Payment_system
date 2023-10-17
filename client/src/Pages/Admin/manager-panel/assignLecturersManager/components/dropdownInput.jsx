import React from "react";

// Styles
import styles from "./dropdownField.module.css";

const DropdownInput = ({ selectedBranch, handleOptionChange, style, list }) => {
  return (
    <>
      <div className={styles.container}>
        <select
          id="course"
          name="course"
          value={selectedBranch}
          onChange={handleOptionChange}
          className={styles.dropdown}
          style={style}
        >
          <option value="" disabled className={styles.defaultOption}>
            Select a Lecturer
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

export default DropdownInput;
