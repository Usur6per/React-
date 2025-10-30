import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ForwardToHome = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate('../Home')
    },[]) //load
    
    return ( 
    <>
    <h2>ForwardToHome</h2>
    </> 
    );
}

export default ForwardToHome;