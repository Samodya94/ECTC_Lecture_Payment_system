import { useNavigate } from "react-router-dom";
import { useLecAuthContext } from "./useLecAuthContext";


export const useLecLogout = () => {
    const { dispatch }= useLecAuthContext()
    const navigate = useNavigate();
    
    const logout = () => {
        localStorage.removeItem('lecturer')
        
        dispatch({type: 'LOGOUT'})
        navigate('/')
    }

    return {logout}
}