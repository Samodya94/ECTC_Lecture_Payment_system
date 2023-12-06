import { React, useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from 'react-router-dom'

import Service from "../../../../utilities/httpService";

// Styles
import styles from "./createPayment.module.css";

// Components
import InputField from "../../components/inputField";
import PrimaryButton from "../../components/primaryButton";
import InputFieldDis from "../../components/inputFieldDis";
import InputNumFieldDis from "../../components/inputNumFieldDis";

const CreatePayment = () => {
    const navigate = useNavigate();
    const Param = useParams();
    const id = Param.id;

    const service = useMemo(() => new Service(), []);

    //get all courses and list them in the dropdown id:courseName name:courseName
    useEffect(() => {
        const respone = service.get(`course/`)
        respone.then((res) => {
            setCourseList(res.data);
        }).catch((err) => {
            alert(err);
        })
    }, [service]);

    const [courseList, setCourseList] = useState([]);

    const courseListAll = courseList.map((item) => {
        return { _id: item.courseName, name: item.courseName + "  ( " + item.courseDuration + "months )" };
    });

    //get all branches and list them in the dropdown id:branchName name:branchName
    useEffect(() => {
        const respone = service.get(`branch/all`)
        respone.then((res) => {
            setBranchList(res.data);
        }).catch((err) => {
            alert(err);
        })
    }, [service]);

    const [branchList, setBranchList] = useState([]);

    const branchListAll = branchList.map((item) => {
        return { _id: item.branchName, name: item.branchName };
    });

    const stateList = [
        { _id: "Active", name: "Active" },
        { _id: "Inactive", name: "Inactive" },
    ];

    const [batchCode, setBatchCode] = useState("");
    const [course, setCourse] = useState("");
    const [branch, setBranch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [batchState, setBatchState] = useState("");

    //get batch details and set them to the fields
    useEffect(() => {
        function loadBatch() {
            const response = service.get(`batch/${id}`);
            response.then((res) => {
                setBatchCode(res.data.batchCode);
                setCourse(res.data.course);
                setBranch(res.data.branch);
                setStartDate(res.data.startDate);
                setEndDate(res.data.endDate);
                setBatchState(res.data.batchState);
            }).catch((err) => {
                alert(err);
            });
        }

        loadBatch();
    }, [id, service]);

    //update batch details
    const data = {
        batchCode: batchCode,
        course: course,
        branch: branch,
        startDate: startDate,
        endDate: endDate,
        batchState: batchState,
    };

    //update batch details function
    function editBatch(e) {
        const respone = service.put(`batch`, id, data)
        respone.then((res) => {
            alert("Edit Successfull");
            navigate('/admin/manage-batches');
        })
            .catch((err) => {
                alert(err);
            });
        e.preventDefault();
    }

    // Handling the dropdown fields
    const handleBranchChange = (e) => {
        setBranch(e.target.value);
    };

    const handleCourseChange = (e) => {
        setCourse(e.target.value);
    };

    const handleStateChange = (e) => {
        setBatchState(e.target.value);
    };

    //function to get course duration
    async function getCourseDuration(courseName) {
        try {
            const response = await service.get(`course/${courseName}`);
            console.log(response.data.courseDuration);
            return response.data.courseDuration;
        } catch (err) {
            console.log(err);
            throw err; // rethrow the error to be caught by the calling function
        }
    }


    //function to check course duration month > end date- start date 
    async function checkCourseDuration(e) {
        e.preventDefault();
        try {
            const duration = await getCourseDuration(data.course);
            const start = new Date(data.startDate);
            const end = new Date(data.endDate);
            const diffTime = Math.abs(end - start);
            const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

            console.log(diffMonths);
            console.log(duration);

            if (diffMonths < duration) {
                alert("Batch Duration is less than the course duration");
            } else {
                editBatch(e);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.subContainer}>
                    <p className={styles.heading}>Create Payment</p>
                    <form onSubmit={checkCourseDuration}>
                        <InputFieldDis
                            lable={"Month"}
                            placeholder={"Enter Month"}
                            value={batchCode}
                            setValue={setBatchCode}
                            style={{ width: "300px" }}
                        />
                        <InputFieldDis
                            lable={"Lecturer Name"}
                            placeholder={"Enter Lecturer Name"}
                            value={batchCode}
                            setValue={setBatchCode}
                            style={{ width: "300px" }}
                        />
                        <InputFieldDis
                            lable={"Batch Code"}
                            placeholder={"Enter Batch Code"}
                            value={batchCode}
                            setValue={setBatchCode}
                            style={{ width: "300px" }}
                        />
                        <InputFieldDis
                            lable={"Course"}
                            placeholder={"Enter Course"}
                            value={batchCode}
                            setValue={setBatchCode}
                            style={{ width: "300px" }}
                        />
                        <InputFieldDis
                            lable={"Payment Rate"}
                            placeholder={"Enter Payment Rate"}
                            value={batchCode}
                            setValue={setBatchCode}
                            style={{ width: "300px" }}
                        />

                        <InputNumFieldDis
                            lable={"No of Hours"}
                            placeholder={"Enter No of Hours"}
                            value={batchCode}
                            setValue={setBatchCode}
                            style={{ width: "300px" }}
                            disabled={true}
                        />

                        <InputField
                            lable={"Payment Amount"}
                            placeholder={"Enter Payment Amount"}
                            value={batchCode}
                            setValue={setBatchCode}
                            style={{ width: "300px" }}
                        />

                        <InputField
                            lable={"Document"}
                            placeholder={"Enter Document"}
                            value={batchCode}
                            setValue={setBatchCode}
                            style={{ width: "300px" }}
                        />

                        <InputField
                            lable={"Payment Date"}
                            placeholder={"Enter Payment Date"}
                            value={startDate}
                            setValue={setStartDate}
                            style={{ width: "300px" }}
                        />


                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <PrimaryButton
                                label={"Make Payment"}
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

export default CreatePayment;