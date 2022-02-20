import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    let navigate = useNavigate();
    useEffect(() => {
        const bearerToken = localStorage.getItem('bearerToken');
        if(!bearerToken){
            navigate('/login');
        }
    })
    return <div>Homepage</div>
}

export default HomePage;