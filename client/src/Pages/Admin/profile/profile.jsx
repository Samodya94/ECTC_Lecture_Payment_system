import { React, useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";

import Service from "../../../utilities/httpService";

// Styles
import styles from "./profile.module.css";

import InputField from "../components/inputField";
import PrimaryButton from "../components/primaryButton";
import InputFieldDis from "../components/inputFieldDis";
import InputPasswordField from "../components/inputPasswordField";

const Profile = () => {
    const userName = Cookies.get("username");
    const token = Cookies.get("token");

    const service = useMemo(() => new Service(), []);

    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [branch, setBranch] = useState("");
    const [userLevel, setUserLevel] = useState("");
    const [id, setId] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
                setId(udata._id);
            } catch (message) {
                alert(message);
            }
        }
        loadUserData();
    }, [service, userName]);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        //check if the all the fields are filled
        if (!oldPassword || !newPassword || !confirmPassword) {
            alert("Please fill all the fields");
            return;
        }
        // Check if the new password and confirm password match
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password must match");
            return;
        }

        const response = await fetch("http://4.247.171.89:4000/api/users/change-password", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                username: username,
                oldPassword: oldPassword,
                newPassword: newPassword,
            })

        })

        const json = await response.json()

        if (!response.ok) {
            alert(json.msg)
        }
        if (response.ok) {
            alert(json.msg)
        }

    };

    const newUser = {
        username: username,
        fullname: fullname,
        email: email,
        branch: branch,
        userLevel: userLevel,
    };

    //create new payment function
    function editUser(e) {
        e.preventDefault();
        if (fullname === "" || email === "" || branch === "" || username === "" || userLevel === "") {
            alert("Please fill all the fields");
            return;
        }

        if (!email.includes("@") || !email.includes(".") || email.split(".")[1].split(".")[0].length < 1) {
            alert("Please enter a valid email address");
            return;
        }
        const response = service.put(`users`, id, newUser);
        response.then((res) => {
            alert("User Details Updated");
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        })
    }



    return (
        <>
            <div className={styles.container}>
                <div className={styles.subContainer}>
                    <p className={styles.heading}>Profile</p>
                    <form onSubmit={editUser}>
                        <InputFieldDis
                            lable={"Username"}
                            placeholder={"Enter Username"}
                            value={username}
                            style={{ width: "300px" }}
                        />
                        <InputField
                            lable={"Full Name"}
                            placeholder={"Enter Full Name"}
                            value={fullname}
                            setValue={setFullname}
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
                        <InputPasswordField
                            lable={"Old Password"}
                            placeholder={"Enter Old Password"}
                            setValue={setOldPassword}
                            style={{ width: "300px" }}
                        />
                        <InputPasswordField
                            lable={"New Password"}
                            placeholder={"Enter New Password"}
                            setValue={setNewPassword}
                            style={{ width: "300px" }}
                        />
                        <InputPasswordField
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
