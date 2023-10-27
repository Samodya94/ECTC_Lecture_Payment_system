import { useAuthContext } from "./useAuthContext";
import Cookies from "js-cookie";

export const useLogout = () => {
    const { dispatch } = useAuthContext()

    const logout = () => {

        Cookies.remove('username'),
            Cookies.remove('token'),
            Cookies.remove('userLevel'),
            Cookies.remove('admin'),


            dispatch({ type: 'LOGOUT' })

    }

    return { logout }
}