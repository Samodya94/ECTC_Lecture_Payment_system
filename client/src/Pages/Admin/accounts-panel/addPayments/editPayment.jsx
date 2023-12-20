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

const EditPayment = () => {
    const navigate = useNavigate();
    const Param = useParams();
    const id = Param.id;

    const service = useMemo(() => new Service(), []);

    const [lectureid, setLectureid] = useState("");
    const [courseName, setCourseName] = useState("");
    const [batchCode, setBatchCode] = useState("");
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState(0);
    const [lectureCoverage, setLectureCoverage] = useState([]);
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [document, setDocument] = useState("");
    const [rate, setRate] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("Pending");
    const [paidDate, setPaidDate] = useState("");

    const [initialDataLoaded, setInitialDataLoaded] = useState(false);

    const [paidData, setPaidData] = useState({
        date: '',
        lectureid: '',
        batchCode: '',
        courseName: '',
        rate: '',
        totalhours: '',
    });

    useEffect(() => {
        async function loadApproveCoverage() {
            try {
                const response = await service.get(`payment/${id}`);
                const paymentData = response.data;
                setLectureid(paymentData.lecturerId);
                setCourseName(paymentData.coursename);
                setBatchCode(paymentData.batchcode);
                setDate(paymentData.month);
                setDuration(paymentData.totalhours);
                setPaymentAmount(paymentData.paidamount);
                setRate(paymentData.paymentrate);
                setDocument(paymentData.document);
                setPaidDate(paymentData.paymentDate);

                // Fetch lecture name using lecture id
                const lectureResponse = await service.get(`lecturer/${paymentData.lecturerId}`);
                const lectureName = lectureResponse.data.firstName + " " + lectureResponse.data.lastName;

                // Fetch batchCode using batchCode
                const batchResponse = await service.get(`batch/${paymentData.batchcode}`);
                const batch = batchResponse.data.batchCode;


                setPaidData({
                    date: paymentData.month,
                    lectureid: lectureName,
                    batchCode: batch,
                    courseName: paymentData.coursename,
                    rate: paymentData.paymentrate,
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
        month: date,
        totalhours: duration,
        paymentrate: rate,
        paidamount: paymentAmount,
        document: document,
        paymentDate: paidDate,
        status: "Not Approved",
        adminStatus: "Not Approved",
    }

    //create new payment function
    function editPayment(e) {
        e.preventDefault();
        const response = service.put(`payment`, id, newPayment);
        response.then((res) => {
            alert("Payment Updated");
            navigate('/admin/add-payments');
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.subContainer}>
                    <p className={styles.heading}>Edit Payment</p>
                    <form onSubmit={editPayment}>
                        <InputFieldDis
                            lable={"Month"}
                            placeholder={"Enter Month"}
                            value={date}
                            style={{ width: "300px" }}
                        />
                        <InputFieldDis
                            lable={"Lecturer Name"}
                            placeholder={"Enter Lecturer Name"}
                            value={paidData.lectureid}
                            style={{ width: "300px" }}
                        />
                        <InputFieldDis
                            lable={"Batch Code"}
                            placeholder={"Enter Batch Code"}
                            value={paidData.batchCode}
                            style={{ width: "300px" }}
                        />
                        <InputFieldDis
                            lable={"Course"}
                            placeholder={"Enter Course"}
                            value={courseName}
                            style={{ width: "300px" }}
                        />
                        <InputFieldDis
                            lable={"Rate"}
                            placeholder={"Enter Rate"}
                            value={rate}
                            style={{ width: "300px" }}
                        />


                        <InputFieldDis
                            lable={"No of Hours"}
                            placeholder={"Enter No of Hours"}
                            value={calculateDuration(duration)}
                            style={{ width: "300px" }}
                        />

                        <InputNumField
                            lable={"Payment Amount"}
                            placeholder={"Enter Payment Amount"}
                            value={paymentAmount}
                            setValue={setPaymentAmount}
                            style={{ width: "300px" }}
                        />

                        <InputField
                            lable={"Document"}
                            placeholder={"Enter Document"}
                            value={document}
                            setValue={setDocument}
                            style={{ width: "300px" }}
                        />

                        <InputFieldDate
                            lable={"Payment Date"}
                            placeholder={"Enter Payment Date"}
                            value={paidDate.slice(0, 10)}
                            setValue={setPaidDate}
                            style={{ width: "300px" }}
                        />


                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <PrimaryButton
                                label={"Edit Payment"}
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

export default EditPayment;
