import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

export const useLogout = () => {
    const navigate = useNavigate()
    const { dispatch } = useAuthContext()

    const logout = () => {
        //remove the user from local storage
        Cookies.remove('user')
        Cookies.remove('username')
        Cookies.remove('userLevel')
        Cookies.remove('token')
        dispatch({ type: 'LOGOUT' })

        navigate('/admin-login');

    }

    return { logout }
}