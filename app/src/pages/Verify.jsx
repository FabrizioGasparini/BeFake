import './Login.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { faMessage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import axios from '../api/axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

const Login = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            const response = await axios.post('/login/verify',{code: code, otpSession: cookies.get('otpSession')})
            
            const token = response.data.data.token
            console.log(response)
            cookies.set("token", token, {path: "/"})
            
            return navigate('/')
        } catch (error) {
            setError(error.response.data)
            console.error(error)
        }
    }

    return (
        <>
            <div className="login-frame">
                <h1 className="hl">BeReal.</h1>
                <p className="st">Verifica il tuo numero</p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="inputs">                    
                        <div className="input-box">
                            <input
                                type="password"
                                name="code"
                                id="code"
                                placeholder="• • • • • •"
                                required
                                autoComplete="code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <FontAwesomeIcon className="icon" icon={faMessage} />
                        </div>
                    </div>
                    <button type="submit" className="submit">Continua</button>
                    <p className="error-message">{error}</p>
                </form>
            </div>
        </>
    );
}

export default Login