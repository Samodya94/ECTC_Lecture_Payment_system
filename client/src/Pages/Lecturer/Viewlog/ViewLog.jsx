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

    const [firstName,setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(()=>{
        getLecturer();
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

    useEffect(()=>{
        getdata()
    },[])

    const getdata = async () =>{
        const response = await axios.get(`https://ipapi.co/json/`)
        console.log(response.data)
        setIp(response.data.ip)
        setCountry(response.data.country_name)
        setCity(response.data.city)
      }

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
                    <div className="card-top">
                        from: {city + ", " +country}
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}