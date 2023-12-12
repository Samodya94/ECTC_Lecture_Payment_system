import Cookies from 'js-cookie';
import { useState } from 'react';
import { useAuthContext } from "./useAuthContext";
import axios from 'axios';

import Service from '../utilities/httpService';

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const service = new Service();

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
            //get logDetails
            const getdata = async () => {
                const response = await axios.get(`https://ipapi.co/json/`)
                const ip = response.data.ip;
                const country = response.data.country_name;
                const city = response.data.city;

                const newLog = {
                    ipaddress: ip,
                    country: country,
                    city: city,
                    username: username,

                };

                console.log(newLog);

                const response2 = service.post('loginDetails/', newLog);
            }
            getdata();

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