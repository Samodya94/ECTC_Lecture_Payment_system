import { React, useState, useEffect, useMemo } from "react";
import { useParams } from 'react-router-dom'

import Service from "../../../../utilities/httpService";

// Styles
import styles from "./approvePayments.module.css";

// Components
import TableComponent from "./components/approvedCoverageTable";

const tableColumns = [
    "Date",
    "Start Time",
    "End Time",
    "Duration",
    "Pay Rate",
    "Coverage",
];

const ApprovePaymentCoverages = () => {
    const Param = useParams();
    const id = Param.id;

    const service = useMemo(() => new Service(), []);

    const [lectureid, setLectureid] = useState("");
    const [batchCode, setBatchCode] = useState("");
    const [date, setDate] = useState("");
    const [lectureCoverage, setLectureCoverage] = useState([]);

    const [initialDataLoaded, setInitialDataLoaded] = useState(false);

    useEffect(() => {
        async function loadPayment() {
            try {
                const response = await service.get(`payment/${id}`);
                const paymentData = response.data;
                setLectureid(paymentData.lecturerId);
                setBatchCode(paymentData.batchcode);
                setDate(paymentData.month);

                setInitialDataLoaded(true);
            } catch (err) {
                alert(err);
            }
        }

        loadPayment();
    }, [service, id]);

    useEffect(() => {
        if (initialDataLoaded) {
            async function loadCoverage() {
                try {
                    const month = date.slice(5, 7);
                    const year = date.slice(0, 4);
                    const paymentStatus = "Pending";

                    const response = await service.get(`coverage/${lectureid}/${batchCode}/${month}/${year}/${paymentStatus}`);
                    setLectureCoverage(response.data);
                } catch (err) {
                    alert(err);
                }
            }
            loadCoverage();
        }
    }, [service, id, initialDataLoaded, lectureid, batchCode, date]);

    return (
        <>
            <div className={styles.container}>
                <p className={styles.heading}>Approve Coverages</p>
                <div>
                    <TableComponent columns={tableColumns} rows={lectureCoverage} />
                </div>
            </div>
        </>
    );
};

export default ApprovePaymentCoverages;
