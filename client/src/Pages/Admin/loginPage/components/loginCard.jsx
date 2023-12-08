import { useState } from "react";

import { useLogin } from "../../../../hooks/useLogin";

// Import common components
import InputField from "../../components/placeholderIntput";
import PrimaryButton from "../../components/primaryButton";

// Styles
import styles from "./loginCard.module.css";

// Assets
import logo from "../../../../assets/logo.jpg";
import { Link } from "react-router-dom";

const LoginCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(username, password)
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
        <img className={styles.logo} src={logo} alt="ECTC logo" />
        <div className={styles.innerContainer}>
          <form onSubmit={handleSubmit}>
            {/* Input Fields */}
            <InputField
              label="Username"
              type="text"
              style={{
                color: "white",
                marginBottom: "15px",
                marginTop: "20px",
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

          {/* Error Message */}
          {error && (
            <div
              style={{
                backgroundColor: "red",
                color: "white",
                fontWeight: "bold",
                fontSize: "14px",
                marginTop: "15px",
                textAlign: "center",
                padding: "10px",
              }}
            >
              {error}
            </div>
          )}

          {/* Buttons */}
          <Link to="/lec-login"><PrimaryButton
            label=">> Lecturer Login"
            style={{
              color: "white",
              width: "100%",
              padding: "10px 0",
              marginTop: "20px",
              backgroundColor: "#B60A21",
            }}
          /></Link>
        </div>
      </div>
    </>
  );
};

export default LoginCard;
