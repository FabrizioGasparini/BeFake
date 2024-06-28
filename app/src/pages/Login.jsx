import './Login.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import axios from '../api/axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const Login = () => {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("Invio in corso...")

        try {
            const response = await axios.post('/login/send-code', { phone: phone })
            
            try
            {
                setError(response.data.data.otpSession.error.message)
            }
            catch
            {
                const otpSession = response.data.data.otpSession.sessionInfo
    
                cookies.set("otpSession", otpSession, {path: "/"})
                
                return navigate('/login/verify')
            }
    
            
        } catch (error) {
            setError(error.response.data)
            console.error(error)
        }
    }

    return (
        <>
            <div className="login-frame">
                <h1 className="hl">BeReal.</h1>
                <p className="st">Qual è il tuo numero di telefono?</p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="inputs">                    
                        <div className="input-box">
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                placeholder="(+00) 123-456-7890"
                                required
                                autoComplete="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <FontAwesomeIcon className="icon" icon={faPhone} />
                        </div>
                    </div>
                    <button type="submit" className="submit">Invia messaggio di verifica</button>
                    <p className="error-message">{error}</p>
                </form>
            </div>
        </>
    );
}

export default Login