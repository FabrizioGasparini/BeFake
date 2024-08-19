import { useEffect, useState } from 'react'

import BeReal from '../components/bereal/BeReal'
import Modal from '../components/Modal'

import request from '../api/request'

import { useNavigate } from 'react-router-dom'

import { faSignOut, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Cookies from 'universal-cookie'

const cookies = new Cookies()

const Home = () => {
    const [data, setData] = useState(null)
    const [modal, setModal] = useState(false)
    const [modalType, setModalType] = useState("")
    const [modalData, setModalData] = useState({"comments": []})

    const navigate = useNavigate()
    
    const getData = async () => {
        if (data != null) return
        
        try {
            const token = cookies.get("token")
            const response = await request('/feeds/friends-v1', 'get', {'token': token})

            setData(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const showModal = (show, data, type) => { 
        setModalType(type)
        setModal(show)
        setModalData(data)
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
            <div className="upload absolute left-10 top-10 text-5xl cursor-pointer" onClick={() => navigate('/upload')}><FontAwesomeIcon icon={faUpload} /></div>

            <h1 className="hl font-extrabold">BeReal.</h1>
            {
                data != null ? 
                    <>
                        <p className="st">I tuoi <span className='font-semibold'>BeReal.</span></p>
                        <div className="userPosts w-full flex items-center justify-center mb-12">
                            {
                                data.userPosts ?
                                <BeReal
                                    friend={data.userPosts}
                                    onClick={showModal}
                                    own={true}    
                                />
                                : <h1 className='st'><br /><br />Non hai ancora caricato un BeReal.</h1>
                            }
                        </div>
                        <p className="st">I <span className='font-semibold'>BeReal.</span> dei tuoi amici</p>
                        <div className="friendsPosts w-full flex flex-col-reverse gap-12">
                            {
                                data.friendsPosts.map((friend, index) => (
                                    <>
                                        <div className="posts w-full flex items-center justify-center relative" key={index}>
                                            <BeReal
                                                friend={friend}
                                                onClick={showModal}
                                                own={false}   
                                            />
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </>
                    :
                    <h1 className='hl'><br /><br />Caricando i <span className='font-semibold'>BeReal.</span></h1>
            }
            <Modal visible={modal} data={modalData} hide={() => showModal(false, null)} type={modalType}/>
        </>
    )
}

export default Home