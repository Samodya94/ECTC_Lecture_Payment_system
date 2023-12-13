import { React, useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";

import Service from "../../../utilities/httpService";

// Styles
import styles from "./profile.module.css";

import InputField from "../components/inputField";
import PrimaryButton from "../components/primaryButton";
import InputFieldDis from "../components/inputFieldDis";
import InputNumField from "../components/inputNumField";

const Profile = () => {
    const userName = Cookies.get("username");

    const service = useMemo(() => new Service(), []);

    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [branch, setBranch] = useState("");
    const [userLevel, setUserLevel] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [initialDataLoaded, setInitialDataLoaded] = useState(false);

    const [userData, setUserData] = useState({
        username: "",
        fullname: "",
        email: "",
        branch: "",
        userLevel: "",
    });

    useEffect(() => {
        async function loadUserData() {
            try {
                const response = await service.get(`users/${userName}`);
                const udata = response.data;
                setUsername(udata.username);
                setFullname(udata.fullname);
                setEmail(udata.email);
                setBranch(udata.branch);
                setUserLevel(udata.userLevel);
                setUserData({
                    username: udata.username,
                    fullname: udata.fullname,
                    email: udata.email,
                    branch: udata.branch,
                    userLevel: udata.userLevel,
                });
                setInitialDataLoaded(true);
            } catch (message) {
                alert(message);
            }
        }
        loadUserData();
    }, [service, userName]);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        // Check if the new password and confirm password match
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password must match");
            return;
        }

        try {
            const response = await service.post("users/change-password", {
                oldPassword,
                newPassword,
                username,
            });

            const json = await response.json()
            setError(json.msg)
            console.log(json.msg)
        }
        catch (msg) {
            setError(msg)
        }

    };


    return (
        <>
            <div className={styles.container}>
                <div className={styles.subContainer}>
                    <p className={styles.heading}>Profile</p>
                    <form onSubmit={''}>
                        <InputFieldDis
                            lable={"Username"}
                            placeholder={"Enter Username"}
                            value={username}
                            style={{ width: "300px" }}
                        />
                        <InputFieldDis
                            lable={"Full Name"}
                            placeholder={"Enter Full Name"}
                            value={fullname}
                            style={{ width: "300px" }}
                        />
                        <InputFieldDis
                            lable={"Branch"}
                            placeholder={"Enter Branch"}
                            value={branch}
                            style={{ width: "300px" }}
                        />
                        <InputFieldDis
                            lable={"User Level"}
                            placeholder={"Enter User Level"}
                            value={userLevel}
                            style={{ width: "300px" }}
                        />

                        <InputField
                            lable={"Email"}
                            placeholder={"Enter Email"}
                            value={email}
                            setValue={setEmail}
                            style={{ width: "300px" }}
                        />
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <PrimaryButton
                                label={"Edit"}
                                type={"submit"}
                                style={{
                                    backgroundColor: "#5A84AE",
                                    padding: "10px 20px",
                                    fontWeight: "600",
                                    fontSize: "0.9rem",
                                    marginTop: "20px",
                                }}
                            />
                        </div>
                    </form>
                </div>
                <div className={styles.subContainer}>
                    <p className={styles.heading}>Change Password</p>
                    <form onSubmit={handleChangePassword}>
                        <InputField
                            lable={"Old Password"}
                            placeholder={"Enter Old Password"}
                            setValue={setOldPassword}
                            style={{ width: "300px" }}
                        />
                        <InputField
                            lable={"New Password"}
                            placeholder={"Enter New Password"}
                            setValue={setNewPassword}
                            style={{ width: "300px" }}
                        />
                        <InputField
                            lable={"Confirm Password"}
                            placeholder={"Enter Confirm Password"}
                            setValue={setConfirmPassword}
                            style={{ width: "300px" }}
                        />
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <PrimaryButton
                                label={"Change Password"}
                                type={"submit"}
                                style={{
                                    backgroundColor: "#5A84AE",
                                    padding: "10px 20px",
                                    fontWeight: "600",
                                    fontSize: "0.9rem",
                                    marginTop: "20px",
                                }}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Profile;
