import { useEffect, useState } from "react";
import { useLecAuthContext } from "../../../hooks/useLecAuthContext"
import Service from "../../../utilities/httpService"
import axios from "axios";

export const ViewLog =()=>{

    const { lecturer } = useLecAuthContext()
    const service = new Service();
    const [country,setCountry] = useState('') 
    const [city,setCity] = useState('')
    const [ip,setIp] = useState('')
    const [logs,setLogs] = useState([])

    const [firstName,setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    useEffect(()=>{
        getLecturer();
        getLogDetails();
    },[lecturer])

    const getLogDetails = () =>{
        if(lecturer){
            const lecName=lecturer.username
            
           const response = service.get('/leclog/recent',lecName)
           response.then((res)=>{
            setLogs(res.data)
           })
        }else{
           
        }
    }


    const getLecturer = () =>{
        if(lecturer){
            const lecid=lecturer.id

            const response = service.get('lecturer',lecid);
            response.then((res)=>{
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
            })
        }
    }

    useEffect(()=>{
        getdata()
    },[])

    const getdata = async () =>{
        const response = await axios.get(`https://ipapi.co/json/`)
        setIp(response.data.ip)
        setCountry(response.data.country_name)
        setCity(response.data.city)
      }

    return(
        <div className="logDetails">
            <h1> View My Login Details</h1>
            <div className="row mt-5 p-3">
                <div className="col-md-6 p-5">
                    <div className="log_datcard">
                    <div className="card-top">
                        {firstName + " " + lastName}
                    </div>
                    </div>
                    
                </div>
               
                <div className="col-md-6 p-5">
                    <div className="log_datcard">
                    <div className="card-top">
                       Your IP: {ip}
                    </div>
                    <div className="card-top">
                        from: {city + ", " +country}
                    </div>
                    </div>
                    
                </div>
            </div>

            <div>
                <h1>Recent Logins</h1>

                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>IP</th>
                            <th>From</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                    {logs ? logs.map((logdetail) => {
                            const logDate = new Date(logdetail.createdAt);
                            const formattedDate = logDate.toLocaleDateString();
                            const formattedTime = logDate.toLocaleTimeString();

                            return (
                                <tr key={logdetail._id}>
                                    <td>{logdetail.ipaddress}</td>
                                    <td>{logdetail.city + ", " + logdetail.country}</td>
                                    <td>{formattedDate}</td>
                                    <td>{formattedTime}</td>
                                </tr>
                            );
                        }) : "Hello"}
                    </tbody>
                </table>
            </div>
        </div>
    )
}