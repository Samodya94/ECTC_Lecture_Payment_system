import React from "react";

// Styles
import styles from "./styles/inputField.module.css";

const InputNumField = ({ lable, placeholder, setValue, style, value }) => {
    return (
        <>
            <div className={styles.container}>
                <label className={styles.lable}>{lable}:</label>
                <input
                    type="number"
                    className={styles.inputField}
                    id="courseName"
                    placeholder={placeholder}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    style={style}
                />
            </div>
        </>
    );
};

export default InputNumField;
