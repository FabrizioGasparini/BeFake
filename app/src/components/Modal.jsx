import PropTypes from 'prop-types'
import RealMoji from './bereal/RealMoji'
import { useState, useEffect } from 'react'
import Comment from './bereal/Comment'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import request from '../api/request'
import Cookies from 'universal-cookie'

const cookies = new Cookies()


const Modal = ({ visible, data, hide, type }) => {
    const [comment, setComment] = useState('')
    const [commentsList, setCommentsList] = useState([])

    const [userRealmojis, setUserRealmojis] = useState([])

    const getTimeFromDate = (date) => {
        const data = new Date(date)

        return data.toLocaleTimeString()
    }

    const getTimeDifferenceInSeconds = (date) => {
        const data = new Date(date)
        const now = new Date()
    
        const differenceInMilliseconds = now - data;
        const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

        return differenceInSeconds
    }

    const getTime = () => {
        var timeString = ""
        
        var time = getTimeDifferenceInSeconds(data.postedAt)
    
        if (time > 3600) timeString = Math.ceil(time / 3600) + " h fa"    
        else if (time > 60) timeString = Math.ceil(time / 60) + " min fa"    
        else timeString = time + " sec fa"
        
        return `${getTimeFromDate(data.postedAt)} • ${timeString}`
    }

    const sendComment = async () => {
        if (comment == '') return

        try {
            const response = await request(`/content/comments?postId=${data.id}&postUserId=${data.userId}`, 'post', { 'content': comment })

            setCommentsList(commentsList => [...commentsList, response.data]);
            setComment('')
        }
        catch (error) { console.error(error) }
    }
    
    
    const sendRealmoji = async (realMoji) => {
        if (realMoji == null) return
    
        try
        {
            await request(`/content/realmojis?postId=${data.id}&postUserId=${data.userId}`, 'put', { 'emoji': realMoji.emoji })
            hide()
        }
        catch (error) { console.error(error) }
    }

    useEffect(() => {
        const loadComments = () => { if(visible && data.comments) setCommentsList(data.comments) }
        
        const getUserRealmojis = async () => {
            if (type != 'react') return
            
            try
            {
                const response = await request('/person/me', 'get', {'token': cookies.get("token")})
                setUserRealmojis(response.data.realmojis)
                console.log(response.data.realmojis)
            }
            catch (error) { console.error(error) }
        }

        loadComments()
        getUserRealmojis()
    }, [visible])

    return (
        <>
            {
                data ?
                    <>
                        <div className={`fixed z-10 w-full h-full inset-0 bg-black bg-opacity-30 backdrop-blur-sm ${visible ? '' : 'hidden'}`} onClick={hide} />
                        <div className={`realmoji z-20 max-w-xl w-11/12 h-7/12 fixed top-1/2 translate-y-[-50%] flex flex-col items-center gap-6 py-6 rounded-3xl border-neutral-800 border-2 bg-neutral-950 m-5 ${visible ? '' : 'hidden'}`} >
                            {
                                type == "realmoji" ?
                                    <>
                                        <div className="font-light text-3xl -mb-4">RealMoji di <span className='font-semibold'>{data.user.username}</span></div>
                                        <p className="time text-base font-extralight">{getTime()}</p>
                                        <div className="separator w-11/12 h-0.5 bg-neutral-800"></div>
                                        <RealMoji data={data} moreRealMojis={0} onClick={() => {}} big/>
                                    </>
                                    : ''
                            }
                            {
                                type == "comments" ?
                                    <>    
                                        <div className="font-light text-3xl -mb-4"><span className='font-semibold'>Commenti</span></div>
                                        <div className="separator w-11/12 h-0.5 bg-neutral-800"></div>
                                        <ul className='comments-list w-4/5 flex flex-col gap-5'>
                                        {
                                            commentsList.length > 0 ?
                                                commentsList.map((comment, index) => ( <Comment data={comment} key={index} /> ))
                                                : 'Ancora nessun commento...'
                                        }
                                        </ul>
                                        <div className="separator w-11/12 h-0.5 bg-neutral-800"></div>
                                        <div className="send-comment flex items-center gap-2 w-4/5">
                                            <input type="text" placeholder='Scrivi un commento...' className='comment-input w-full h-8 rounded-full p-2 bg-neutral-900' value={comment} onChange={(e) => setComment(e.target.value)} />
                                            <button className='send bg-blue-600 w-8 aspect-square rounded-full flex items-center justify-center' onClick={() => sendComment()}><FontAwesomeIcon icon={faPaperPlane} className='text-sm' /></button>
                                        </div>
                                    </>
                                    : ''
                            }
                            {
                                type == "react" ?
                                    <>    
                                        <div className="font-light text-3xl -mb-4">Reagisci a <span className='font-semibold'>{data.username}</span></div>
                                        <div className="separator w-11/12 h-0.5 bg-neutral-800"></div> 
                                        {
                                            data.userId != cookies.get('userId') ?                                            
                                            <ul className='realmojis-list w-11/12 h-full flex gap-5 justify-center'>
                                                {
                                                    userRealmojis.length > 0 ?
                                                    userRealmojis.map((realMoji, index) => (
                                                        <RealMoji key={index} data={realMoji} moreRealMojis={null} onClick={() => sendRealmoji(realMoji)}/>
                                                    )) : 'Nessuna RealMoji disponibile...'
                                                }
                                            </ul> : 'Non puoi reagire al tuo BeReal'
                                        }
                                    </>
                                    : ''
                            }
                        </div>
                    </>
                : ''
            }
        </>
    )
}

Modal.propTypes = {
    visible: PropTypes.bool,
    data: PropTypes.any,
    hide: PropTypes.func,
    type: PropTypes.string
}

export default Modal