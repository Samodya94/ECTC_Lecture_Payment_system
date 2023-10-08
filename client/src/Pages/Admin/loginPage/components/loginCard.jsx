import { useState } from "react";

// Import common components
import InputField from "../../../../Components/admin/inputField";
import PrimaryButton from "../../../../Components/admin/primaryButton";

// Styles
import styles from "./loginCard.module.css";

// Assets
import logo from "../../../../assets/logo.jpg";

const LoginCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    alert(username + " and PW is " + password);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlepasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className={styles.container}>
        <img className={styles.logo} src={logo} />
        <div className={styles.innerContainer}>
          <form onSubmit={handleSubmit}>
            {/* Input Fields */}
            <InputField
              label="Username"
              type="text"
              style={{
                color: "white",
                marginBottom: "5px",
                backgroundColor: "#0000004D",
              }}
              handleChange={handleUsernameChange}
            />
            <InputField
              label="Password"
              type="password"
              style={{
                color: "white",
                marginBottom: "20px",
                backgroundColor: "#0000004D",
              }}
              handleChange={handlepasswordChange}
            />

            {/* Buttons */}
            <PrimaryButton
              label="Login"
              type="submit"
              style={{
                color: "white",
                width: "100%",
                padding: "10px 0",
                marginTop: "15px",
                backgroundColor: "#4a77d4",
              }}
            />
          </form>

          {/* Buttons */}
          <PrimaryButton
            label=">> Lecturer Login"
            style={{
              color: "white",
              width: "100%",
              padding: "10px 0",
              marginTop: "20px",
              backgroundColor: "#B60A21",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LoginCard;
