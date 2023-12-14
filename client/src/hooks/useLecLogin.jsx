import { useState } from "react";
import { useLecAuthContext } from "./useLecAuthContext";

export const useLecLogin = () => {

    const[error, setError] = useState(null)
    const[isLoading, setIsLoading] = useState(null)
    const { dispatch } = useLecAuthContext()

    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:8000/api/LectRoute/login/login',{
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

            //update Authcontext
            dispatch({type: 'LOGIN', payload: json})

           
            setIsLoading(false)
        }
        
    }

    return {login, isLoading, error}
}