import { React, useState, useCallback, useEffect, useMemo } from "react";

import Service from "../../../utilities/httpService";
import Cookies from "js-cookie";

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

        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center">Login Details</h1>
                    <br />
                    <table className="table table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">IP Address</th>
                                <th scope="col">Location</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loginDetails.map((loginDetail) => (
                                <tr key={loginDetail._id}>
                                    <td>{loginDetail.ipaddress}</td>
                                    <td>{loginDetail.country + ' ,' + loginDetail.city}</td>
                                    <td>{loginDetail.createdAt.slice(0, 10)}</td>
                                    <td>{addHours(loginDetail.createdAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};

export default LoginDetails;

