import React,{useState, useEffect} from "react";
import '../lec.css'
import logo from '../../../assets/logo.jpg'
import { useNavigate } from "react-router";
import { useLecLogin } from "../../../hooks/useLecLogin";
import axios from "axios";

const LectureLogin =()=>{

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [country,setCountry] = useState('') 
    const [city,setCity] = useState('')
    const [ip,setIp] = useState('')
    const navigate = useNavigate()
    const {login, isLoading, error } = useLecLogin()

    const handleLogin= async (e) => {
        e.preventDefault()
    
        await login(username,password)
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
        <div className="lecloginbody">
            <div className="lec-logo">
                <img src={logo} />
                
                <div>
                    ECTC|PDP <br></br> Lecture Login
                </div>
               
            </div>
            <div className="lec-loginform">
                <form onSubmit={handleLogin} >
                <div>
                    <label>Username:</label><br/>
                    <input
                        type="text"
                        value={username}
                        onChange={(e)=>{
                            setUsername(e.target.value)
                        }}
                    />    
                </div>
                <div>
                    <label>Password:</label><br/>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    />    
                </div>
                <div>
                    <button className="leclog_button my-2">Login</button><br></br>

                    {error && <div className="error">{error}</div>}

                    {city+" "+country+", your ip is "+ip}
                </div>
                </form>
            </div>
        </div>
    )
}

export default LectureLogin;