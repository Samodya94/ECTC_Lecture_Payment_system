import { useState,useEffect } from "react";
import { useLecAuthContext } from "./useLecAuthContext";
import axios from "axios";
import Service from "../utilities/Service";

export const useLecLogin = () => {

    const[error, setError] = useState(null)
    const[isLoading, setIsLoading] = useState(null)
    const { dispatch } = useLecAuthContext()
    const [country,setCountry] = useState('') 
    const [city,setCity] = useState('')
    const [ip,setIp] = useState('')
    const service = new Service();

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


    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://4.247.171.89:4000/api/LectRoute/login/login',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })
    
        const json = await response.json()
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
        }


        if(response.ok){
            //save the user to local storage
            localStorage.setItem('lecturer', JSON.stringify(json))
            const data = {
                lecUsername:username,
                ipaddress:ip,
                city:city,
                country:country,
            }
    
            const response = service.post('lecLog',data)
            response.then(()=>{
                console.log(data)
            }).catch((err)=>{
                console.log(err)
            })
            //update Authcontext
            dispatch({type: 'LOGIN', payload: json})
            setIsLoading(false)
        }
        
    }

    return {login, isLoading, error}
}