import React,{useState, useEffect} from "react";
import '../lec.css'
import logo from '../../../assets/logo.jpg'
import { useNavigate } from "react-router";
import { useLecLogin } from "../../../hooks/useLecLogin";

const LectureLogin =()=>{

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const {login, isLoading, error } = useLecLogin()

    const handleLogin= async (e) => {
        e.preventDefault()
    
        await login(username,password)
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
                    <button className="leclog_button">Login</button>

                    {error && <div className="error">{error}</div>}
                </div>
                </form>
            </div>
        </div>
    )
}

export default LectureLogin;