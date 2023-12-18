import { useEffect } from "react"
import { useNavigate } from "react-router"

export const AddCoverages = () =>{

    const navigate = useNavigate()
    useEffect(()=>{
        navigate('../add_coverage')
    })
    return(<div>
        ...Loading
    </div>)
}