import Cookies from 'js-cookie';
import { useState } from 'react';
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (username, password) => {

        setIsLoading(true)
        setError(null)

        const response = await fetch("http://localhost:8000/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })

        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
            console.log(json.message)
        }
        if (response.ok) {

            //save the user to local storage

            Cookies.set('user', JSON.stringify(json), { expires: 7 })
            Cookies.set('username', json.username, { expires: 7 })
            Cookies.set('userLevel', json.userLevel, { expires: 7, secure: true })
            Cookies.set('token', json.token, { expires: 7, secure: true })
            dispatch({ type: 'LOGIN', payload: json })

            setIsLoading(false)

        }
    }

    return { login, isLoading, error }

}