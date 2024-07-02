import { Outlet, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import request from '../api/request'
import { refreshTokens } from "../api/fire/refresh";

const cookies = new Cookies()

const PrivateRoutes = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const checkToken = async () => {
            try
            {  
                const token = cookies.get("token")
                axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

                await request('/person/me', 'get', {'token': token})
            } 
            catch (error)
            {
                const newTokens = await refreshTokens()
                console.log(newTokens)

                if (!newTokens)
                {
                    console.error('Errore durante la verifica del token:', error);
                    if(error.response.data == "See /corsdemo for more info") window.open('https://cors-anywhere.herokuapp.com/corsdemo', '_blank')
                    return navigate('/login')    
                }

                cookies.set("token", newTokens.accessToken)
                cookies.set("refreshToken", newTokens.refreshToken)

                axios.defaults.headers.common = { 'Authorization': `Bearer ${newTokens.accessToken}` }
            }
        }
    
        checkToken()
    }, [navigate])
    
    return (
        <Outlet/>
    )
}

export default PrivateRoutes