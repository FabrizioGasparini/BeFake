import { useEffect, useState } from 'react'

import BeReal from '../components/bereal/BeReal'

import axios from '../api/axios'
import request from '../api/request'

import Cookies from 'universal-cookie'
import { refreshTokens } from '../api/fire/refresh'
import Modal from '../components/Modal'

import { faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

const cookies = new Cookies()

const Home = () => {
    const [data, setData] = useState(null)
    const [modal, setModal] = useState(false)
    const [modalData, setModalData] = useState(null)

    const navigate = useNavigate()

    const refreshToken = async () => {
        const currentToken = cookies.get("refreshToken")
        
        try {
            const tokens = await refreshTokens(currentToken)
            if (!tokens) { return; }

            cookies.set("token", tokens.accessToken)
            cookies.set("refreshToken", tokens.refreshToken)

            axios.defaults.headers.common = { 'Authorization': `Bearer ${tokens.accessToken}` }
            getData()
        } catch (error) {
            console.error(error)
        }
    }
    
    const getData = async () => {
        if (data != null) return
        
        try {
            const token = cookies.get("token")
            axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }

            const response = await request('/feeds/friends-v1', 'get', {'token': token})
            console.log(response)

            setData(response.data)
        } catch (error) {
            refreshToken()
            console.error(error)
        }
    }

    const showModal = (show, moji) => { 
        setModal(show)
        setModalData(moji)
    }

    const logout = () => {
        cookies.remove('token')
        cookies.remove('refreshToken')
        cookies.remove('sessionInfo')

        return navigate('/login')
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <div className="logout absolute right-10 top-10 text-5xl cursor-pointer" onClick={() => logout()}><FontAwesomeIcon icon={faSignOut} /></div>
            <h1 className="hl font-extrabold">BeReal.</h1>
            {data != null ? (
                <>
                    <p className="st">I tuoi <span className='font-semibold'>BeReal.</span></p>
                    <div className="userPosts w-full flex items-center justify-center mb-12">
                        {
                            data.userPosts ?
                            <BeReal
                                friend={data.userPosts}
                                onClickRealMoji={showModal}
                            />
                             : <h1 className='st'><br /><br />Non hai ancora caricato un BeReal.</h1>
                        }
                    </div>
                    <p className="st">I <span className='font-semibold'>BeReal.</span> dei tuoi amici</p>
                    <div className="friendsPosts flex flex-col-reverse gap-12">
                        {
                            data.friendsPosts.map((friend, index) => (
                                <>
                                    <div className="posts w-full flex items-center justify-center relative" key={index}>
                                        <BeReal
                                            friend={friend}
                                            onClickRealMoji={showModal}
                                        />
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </>) : <h1 className='hl'><br /><br />Caricando i <span className='font-semibold'>BeReal.</span></h1>
            }
            <Modal visible={modal} data={modalData} hide={() => showModal(false, null)}/>
        </>
    )
}

export default Home