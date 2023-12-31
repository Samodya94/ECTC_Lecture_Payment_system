import { React, useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from 'react-router-dom'

import Service from "../../../../utilities/httpService";

// Styles
import styles from "./createPayment.module.css";

// Components
import TableComponent from "./components/paymentTable";
import InputField from "../../components/inputField";
import PrimaryButton from "../../components/primaryButton";
import InputFieldDis from "../../components/inputFieldDis";
import InputNumField from "../../components/inputNumField";
import InputFieldDate from "../../components/inputFieldDate";

const tableColumns = [
    "Course Name",
    "Batch Code",
    "Pay Month",
    "Total Hours",
    "Pay Rate",
    "Coverage",
];

const CreatePayment = () => {
    const navigate = useNavigate();
    const Param = useParams();
    const id = Param.id;

    const service = useMemo(() => new Service(), []);

    const [lectureid, setLectureid] = useState("");
    const [courseName, setCourseName] = useState("");
    const [batchCode, setBatchCode] = useState("");
    const [date, setDate] = useState("");
    const [lectureCoverage, setLectureCoverage] = useState([]);
    const [totalHours, setTotalHours] = useState(0);
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [document, setDocument] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [paymentDate, setPaymentDate] = useState("");

    const [initialDataLoaded, setInitialDataLoaded] = useState(false);

    const [paymentData, setPaymentData] = useState({
        date: '',
        lectureid: '',
        batchCode: '',
        courseName: '',
        rate: '',
    });

    useEffect(() => {
        async function loadApproveCoverage() {
            try {
                const response = await service.get(`coverage/${id}`);
                const coverageData = response.data;
                setLectureid(coverageData.lectureid);
                setCourseName(coverageData.courseName);
                setBatchCode(coverageData.batchCode);
                setDate(coverageData.date);
                setPaymentStatus(coverageData.paymentStatus);

                // Fetch lecture name using lecture id
                const lectureResponse = await service.get(`lecturer/${coverageData.lectureid}`);
                const lectureName = lectureResponse.data.firstName + " " + lectureResponse.data.lastName;

                // Fetch batchCode using batchCode
                const batchResponse = await service.get(`batch/${coverageData.batchCode}`);
                const batch = batchResponse.data.batchCode;

                // Fetch rate using batchCode
                const rateResponse = await service.get(`assignbatch/bylecture/${coverageData.lectureid}/${coverageData.batchCode}`);
                const rate = rateResponse.data.rate;

                setPaymentData({
                    date: coverageData.date.slice(0, 7),
                    lectureid: lectureName,
                    batchCode: batch,
                    courseName: coverageData.courseName,
                    rate: rate,
                });
                setInitialDataLoaded(true);
            } catch (err) {
                alert(err);
            }
        }

        loadApproveCoverage();
    }, [service, id]);

    //get all coverages related to lectureid, batchcode, month and year 
    useEffect(() => {
        if (initialDataLoaded) {
            async function loadCoverage() {
                try {
                    const month = date.slice(5, 7);
                    const year = date.slice(0, 4);

                    const response = await service.get(`coverage/${lectureid}/${batchCode}/${month}/${year}/${paymentStatus}`);
                    setLectureCoverage(response.data);
                    //get total hours
                    let total = 0;
                    response.data.forEach((element) => {
                        total += element.duration;
                    });
                    setTotalHours(total);
                } catch (err) {
                    alert(err);
                }
            }
            loadCoverage();
        }
    }, [service, id, initialDataLoaded, lectureid, batchCode, date, paymentStatus]);

    function calculateDuration(duration) {
        const hours = Math.floor(duration / 3600000);
        const minutes = Math.floor((duration % 3600000) / 60000);

        return `${hours}h : ${minutes}m`;
    }

    const newPayment = {
        lecturerId: lectureid,
        coursename: courseName,
        batchcode: batchCode,
        month: date.slice(0, 7),
        totalhours: totalHours,
        paymentrate: paymentData.rate,
        paidamount: paymentAmount,
        document: document,
        paymentDate: paymentDate,
        status: "Not Approved",
        adminStatus: "Not Approved",
    }

    //create new payment function
    function createPayment(e) {
        e.preventDefault();
        if (paymentAmount === 0) {
            alert("Please fill all the fields");
            return;
        }
        if (paymentAmount < 1) {
            alert("Enter a valid payment amount");
            return;
        }
        //if paymentdate is not entered set it to current date and payment date is around 30 days from current date
        if (paymentDate === "") {
            const today = new Date();
            setPaymentDate(today);
        }

        const response = service.post(`payment/`, newPayment);
        response.then((res) => {
            alert("New Payment Added");
            updateCoverageStatus();
            navigate('/admin/add-payments');
        }).catch((err) => {
            console.log(err);
        })
    }

    //when createpayment each coverage paidstatus change to approved
    function updateCoverageStatus() {
        lectureCoverage.forEach((element) => {
            console.log(element._id);
            const newCoverage = {
                paymentStatus: "Pending",
            };
            const response = service.put(`coverage`, element._id, newCoverage);
            response.then((res) => {
                console.log("Coverage Status Updated");
            }).catch((err) => {
                console.log(err);
            })
        });
    }


    return (
        <>
            <div className={styles.container}>
                <div className={styles.subContainer}>
                    <p className={styles.heading}>Create Payment</p>
                    <form onSubmit={createPayment}>
                        <InputFieldDis
                            lable={"Month"}
                            placeholder={"Enter Month"}
                            value={paymentData.date}
                            style={{ width: "300px" }}
                        />
                        <InputFieldDis
                            lable={"Lecturer Name"}
                            placeholder={"Enter Lecturer Name"}
                            value={paymentData.lectureid}
                            style={{ width: "300px" }}
                        />
                        <InputFieldDis
                            lable={"Batch Code"}
                            placeholder={"Enter Batch Code"}
                            value={paymentData.batchCode}
                            style={{ width: "300px" }}
                        />
                        <InputFieldDis
                            lable={"Course"}
                            placeholder={"Enter Course"}
                            value={paymentData.courseName}
                            style={{ width: "300px" }}
                        />
                        <InputFieldDis
                            lable={"Rate"}
                            placeholder={"Enter Rate"}
                            value={paymentData.rate}
                            style={{ width: "300px" }}
                        />


                        <InputFieldDis
                            lable={"No of Hours"}
                            placeholder={"Enter No of Hours"}
                            value={calculateDuration(totalHours)}
                            style={{ width: "300px" }}
                        />

                        <InputNumField
                            lable={"Payment Amount"}
                            placeholder={"Enter Payment Amount"}
                            setValue={setPaymentAmount}
                            style={{ width: "300px" }}
                        />

                        <InputField
                            lable={"Document"}
                            placeholder={"Enter Link"}
                            setValue={setDocument}
                            style={{ width: "300px" }}
                        />

                        <InputFieldDate
                            lable={"Payment Date"}
                            placeholder={"Enter Payment Date"}
                            setValue={setPaymentDate}
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
                            <PrimaryButton
                                label={"Cancel"}
                                type={"button"}
                                style={{
                                    backgroundColor: "#F20C0C",
                                    padding: "10px 20px",
                                    fontWeight: "600",
                                    fontSize: "0.9rem",
                                    marginLeft: "20px",
                                    marginTop: "20px",
                                }}
                                onClick={() => {
                                    navigate("/admin/add-payments/");
                                }}
                            />
                        </div>
                    </form>
                </div>
                <div>
                    <TableComponent columns={tableColumns} rows={lectureCoverage} />
                </div>
            </div>
        </>
    );
};

export default CreatePayment;
