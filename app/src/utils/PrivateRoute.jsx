import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import request from '../api/request'
import { refreshTokens } from "../api/fire/refresh";

import Cookies from "universal-cookie";

const cookies = new Cookies()

const PrivateRoutes = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const checkToken = async () => {            
            try
            {  
                const response = await request('/person/me', 'get', {'token': cookies.get("token")})
                cookies.set("userId", response.data.id)
            } 
            catch (error)
            {
                const currentToken = cookies.get("refreshToken")

                const newTokens = await refreshTokens(currentToken)
                console.log(newTokens)
                
                if (!newTokens)
                {
                    console.error('Errore durante la verifica del token:', error);
                    if(error.response.data == "See /corsdemo for more info") window.open('https://cors-anywhere.herokuapp.com/corsdemo', '_blank')
                    return navigate('/login')    
                }
                
                cookies.set("token", newTokens.accessToken, {expires: new Date(Date.now() * 2)})
                cookies.set("refreshToken", newTokens.refreshToken, {expires: new Date(Date.now() * 2)})
            }
        }
    
        checkToken()
    }, [])
    
    return (
        <Outlet/>
    )
}

export default PrivateRoutes