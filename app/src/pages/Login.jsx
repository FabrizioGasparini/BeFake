import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { getSessionInfo } from '../api/fire/login'

import Cookies from 'universal-cookie';

const cookies = new Cookies()

const Login = () => {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        const sessionInfo = await getSessionInfo(phone)
        
        if (sessionInfo == undefined || sessionInfo == null) { setError('Errore durante il login!'); return }

        cookies.set('sessionInfo', sessionInfo, {expires: new Date(Date.now() * 2)})
        return navigate('/login/verify')
    }

    return (
        <>
            <div className="login-frame w-50 h-full flex flex-col justify-center text-center">
                <h1 className="hl">BeReal.</h1>
                <p className="st">Qual è il tuo numero di telefono?</p>
                <form className="form flex-1 flex items-center justify-center flex-col mb-7" onSubmit={handleSubmit}>
                    <div className="inputs flex-[0.5] w-5/6 flex items-center justify-around flex-col mb-6">                    
                        <div className="input-box w-full h-16 relative my-3 transition group">
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                placeholder="+00 123 456 7890"
                                required
                                autoComplete="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full h-full bg-white bg-opacity-20 outline-none border-white border-opacity-20 border-2 transition rounded-full text-base text-center p-5 hover:border-opacity-100 placeholder:text-neutral-400 -webkit-autofill:border-[#412a6c]"
                            />
                            <FontAwesomeIcon className="icon absolute right-5 top-1/2 -translate-y-1/2 text-base group-hover:text-white group-hover:-translate-y-1/2 group-hover:rotate-[360deg] transition" icon={faPhone}/>
                        </div>
                    </div>
                    <button type="submit" className="submit w-11/12 h-14 bg-white bg-opacity-90 text-black outline-none  border-[rgba(123,150,255,0.4)] rounded-full text-base font-semibold cursor-pointer mt-7 scale-100 hover:scale-110 transition">Invia messaggio di verifica</button>
                    <p className="error-message text-center text-[#f00] text-base font-medium mt-4">{error}</p>
                </form>
            </div>
        </>
    );
}

export default Login