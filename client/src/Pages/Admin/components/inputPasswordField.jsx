import React from "react";

// Styles
import styles from "./styles/passwordFiled.module.css";

const InputPasswordField = ({ lable, placeholder, setValue, style, value }) => {
    return (
        <>
            <div className={styles.container}>
                <label className={styles.lable}>{lable}:</label>
                <input
                    type="password"
                    className={styles.inputField}
                    placeholder={placeholder}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    style={style}
                />
            </div>
        </>
    );
};

export default InputPasswordField;
