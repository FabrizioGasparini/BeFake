import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { faMessage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Cookies from 'universal-cookie';

import { getTokens } from '../api/fire/verify'
import axios from '../api/axios';

const cookies = new Cookies()

const Login = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        const tokens = await getTokens(code)
        if (!tokens) { setError("Codice non valido!"); return; }

        cookies.set("token", tokens.accessToken)
        cookies.set("refreshToken", tokens.refreshToken)

        axios.defaults.headers.common = { 'Authorization': `Bearer ${tokens.accessToken}` }

        return navigate('/')
    }
    return (
        <>
            <div className="login-frame w-50 h-full flex flex-col justify-center text-center">
                <h1 className="hl">BeReal.</h1>
                <p className="st">Verifica il tuo numero</p>
                <form className="form flex-1 flex items-center justify-center flex-col mb-7" onSubmit={handleSubmit}>
                    <div className="inputs flex-[0.5] w-5/6 flex items-center justify-around flex-col mb-6">                    
                        <div className="input-box w-full h-16 relative my-3 transition group">
                            <input
                                type="password"
                                name="code"
                                id="code"
                                placeholder="• • • • • •"
                                required
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="w-full h-full bg-white bg-opacity-20 outline-none border-white border-opacity-20 border-2 transition rounded-full text-base text-center p-5 hover:border-opacity-100 placeholder:text-neutral-400 -webkit-autofill:border-[#412a6c]"
                            />
                            <FontAwesomeIcon className="icon absolute right-5 top-1/2 -translate-y-1/2 text-base group-hover:text-white group-hover:-translate-y-1/2 group-hover:rotate-[360deg] transition" icon={faMessage} />
                        </div>
                    </div>
                    <button type="submit" className="submit w-11/12 h-14 bg-white bg-opacity-90 text-black outline-none  border-[rgba(123,150,255,0.4)] rounded-full text-base font-semibold cursor-pointer mt-7 scale-100 hover:scale-110 transition">Continua</button>
                    <p className="error-message text-center text-[#f00] text-base font-medium mt-4">{error}</p>
                </form>
            </div>
        </>
    );
}

export default Login