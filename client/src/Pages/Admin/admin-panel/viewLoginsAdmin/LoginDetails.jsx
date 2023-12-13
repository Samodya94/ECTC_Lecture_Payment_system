import { React, useState, useCallback, useEffect, useMemo } from "react";

import Service from "../../../../utilities/httpService";
import Cookies from "js-cookie";

import TableComponent from "./components/loginDetailsTable";
import LecTableComponent from "./components/lecLoginDetailsTable";
import SearchField from "../../components/searchField";

import styles from "./loginDetails.module.css";

const tableColumns = [
    "Username",
    "IP Address",
    "Location",
    "Date",
];

const AllLoginDetails = () => {
    const [loginDetails, setLoginDetails] = useState([]);
    const [lecLoginDetails, setLecLoginDetails] = useState([]);
    const [search, setSearch] = useState("");
    const [searchLec, setSearchLec] = useState("");

    const service = useMemo(() => new Service(), []);

    const getLoginDetails = useCallback(() => {
        const response = service.get("loginDetails");
        response
            .then((res) => {
                setLoginDetails(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [service]);

    const getLecLoginDetails = useCallback(() => {
        const response = service.get("lecLog");
        response
            .then((res) => {
                setLecLoginDetails(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [service]);

    useEffect(() => {
        getLoginDetails();
        getLecLoginDetails();
    }, [getLoginDetails, getLecLoginDetails]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        if (e.target.value === "") {
            getLoginDetails();
        } else {
            const filteredLoginDetails = loginDetails.filter((loginDetail) =>
                loginDetail.username.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setLoginDetails(filteredLoginDetails);
        }
    };

    const handleSearchLec = (e) => {
        setSearchLec(e.target.value);
        if (e.target.value === "") {
            getLecLoginDetails();
        } else {
            const filteredLoginDetails = lecLoginDetails.filter((loginDetail) =>
                loginDetail.lecUsername.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setLecLoginDetails(filteredLoginDetails);
        }
    };


    return (
        <>
            <div className={styles.container}>
                <p className={styles.heading}>Login Details</p>
                <SearchField lable={"Search By Username"} handleChange={handleSearch} />
                <div>
                    <TableComponent columns={tableColumns} rows={loginDetails} />
                </div>
                <SearchField lable={"Search By Lecturer Username"} handleChange={handleSearchLec} />
                <div>
                    <LecTableComponent columns={tableColumns} rows={lecLoginDetails} />
                </div>
            </div>
        </>
    );
};

export default AllLoginDetails;