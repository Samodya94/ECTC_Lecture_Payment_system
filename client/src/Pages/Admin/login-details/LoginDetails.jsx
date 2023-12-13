import { React, useState, useCallback, useEffect, useMemo } from "react";

import Service from "../../../utilities/httpService";
import Cookies from "js-cookie";

import TableComponent from "./components/loginDetailsTable";

import styles from "./loginDetails.module.css";

const tableColumns = [
    "IP Address",
    "Location",
    "Date",
    "Time",
];

const LoginDetails = () => {
    const [loginDetails, setLoginDetails] = useState([]);

    const username = Cookies.get("username");

    const service = useMemo(() => new Service(), []);

    const getLoginDetails = useCallback(() => {
        const response = service.get(`loginDetails/${username}`);
        response
            .then((res) => {
                setLoginDetails(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [service, username]);

    useEffect(() => {
        getLoginDetails();

    }, [getLoginDetails]);

    //get time and add 5.30 hours
    function addHours(date) {
        var d = new Date(date);
        return d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    }




    return (
        <>
            <div className={styles.container}>
                <p className={styles.heading}>Login Details</p>
                <div>
                    <TableComponent columns={tableColumns} rows={loginDetails} />
                </div>
            </div>
        </>
    );
};

export default LoginDetails;