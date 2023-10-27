import React from "react";

// Styles
import styles from "./styles/searchField.module.css";

const SearchField = ({ lable, handleChange }) => {
  return (
    <>
      <div className={styles.container}>
        <input
          placeholder={lable}
          className={styles.input}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default SearchField;
