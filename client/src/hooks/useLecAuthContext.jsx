import { LecAuthContext } from "../context/LecAuthContext";
import { useContext } from "react";

export const useLecAuthContext = () => {

    const context = useContext(LecAuthContext)

    if (!context) {

        throw Error('useAuthContext must be used inside an AuthContextProvider')

    }
    return context
}