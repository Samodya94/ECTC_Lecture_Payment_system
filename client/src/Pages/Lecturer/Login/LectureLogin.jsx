import React,{useState, useEffect} from "react";
import '../lec.css'
import logo from '../../../assets/logo.jpg'
import { useNavigate } from "react-router";

const LectureLogin =()=>{

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    function handlelogin(e){
        e.preventDefault()
        navigate('/lecture');
        console.log(username)
        console.log(password)
    }

    return(
        <div className="lecloginbody">
            <div className="lec-logo">
                <img src={logo} />
                <div>
                    Ewis Career Training Centre
                </div>
            </div>
            <div className="lec-loginform">
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
                    <button onClick={handlelogin} className="leclog_button">Login</button>
                </div>
            </div>
        </div>
    )
}

export default LectureLogin;