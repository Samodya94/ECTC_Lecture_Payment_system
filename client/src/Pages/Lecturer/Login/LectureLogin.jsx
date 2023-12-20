import React,{useState, useEffect} from "react";
import '../lec.css'
import logo from '../../../assets/logo.jpg'
import { useNavigate } from "react-router";
import { useLecLogin } from "../../../hooks/useLecLogin";

import Service from "../../../utilities/Service";
import { Link } from "react-router-dom";

const LectureLogin =()=>{

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const {login, isLoading, error } = useLecLogin()
    const service = new Service()

    const handleLogin= async (e) => {
        e.preventDefault()
        await login(username,password)
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
                    <button className="leclog_button my-2">Login</button>
                    <Link to="/" className="leclog_button backbtn my-2 mx-2">Back</Link>
                    <br></br>

                    {error && <div className="error">{error}</div>}

                  
                </div>
                </form>
            </div>
        </div>
    )
}

export default LectureLogin;