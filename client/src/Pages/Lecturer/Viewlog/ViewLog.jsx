import { useEffect, useState } from "react";
import { useLecAuthContext } from "../../../hooks/useLecAuthContext"
import Service from "../../../utilities/httpService"
import axios from "axios";

export const ViewLog =()=>{

    const { lecturer } = useLecAuthContext()
    const service = new Service();
    const [ip, setIP] = useState("");

    const [firstName,setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(()=>{
        getLecturer();
        getData();
    },[lecturer])

    const getLecturer = () =>{
        if(lecturer){
            const lecid=lecturer.id

            const response = service.get('lecturer',lecid);
            response.then((res)=>{
                console.log(res.data);
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
            })
        }
    }

    const getData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        console.log(res.data);
        setIP(res.data.ip);
        console.log(res.data)
      };

    return(
        <div className="logDetails">
            <h1> View My Login Details</h1>
            <div className="row mt-5 p-5">
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
                    </div>
                    
                </div>
            </div>
        </div>
    )
}