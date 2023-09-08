import React, { useState } from "react";
import classes from './login.module.css';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import img from '../../assets/logo.jpg'
import { login } from "../../redux/authSlice";

const Login = () => {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async(e) => {
         e.preventDefault();

         try {

            const res = await fetch(`http://localhost:8000/users/login`,{
                headers: {
                    'Content-Type': 'application/json'
                },
                method:"POST",
                body: JSON.stringify({username,password})
            })

            const data = await res.json()
            dispatch(login(data))  //{userInfo,token}
            navigate("/")
            
         } catch (error) {
            setError(true);
            setTimeout(() => {
               setError(false)
            }, 3000)
         }
    }

    return(
       <div className={classes.loginContainer}>
          <div className={classes.loginWrapper}>
            <div className={classes.loginLeftSide}>
                <img src={img} alt="" className={classes.leftImg}/>
            </div>
            <div className={classes.loginRightSide}>
                <h2 className={classes.title}>Login</h2>
                <form onSubmit={handleLogin} className={classes.loginForm}>
                    <input type="username" placeholder="Type username" onChange={(e) => setUsername(e.target.value)}/>
                    <input type="password" placeholder="Type password" onChange={(e) => setPassword(e.target.value)}/>
                    <button className={classes.submitBtn}>Login</button>
                    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </form>
                {
                    error && <div className={classes.errorMessage}>
                        Wrong credentials! Try different ones
                    </div>
                }
            </div>
          </div>
       </div>
    )
}

export default Login