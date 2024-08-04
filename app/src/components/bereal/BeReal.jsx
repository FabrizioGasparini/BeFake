import PropTypes from 'prop-types'
import RealMoji from './RealMoji'
import ProfileInfo from './ProfileInfo'

import { faCommentDots, faSmile } from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect } from 'react'
import Location from './Location'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BeReal = ({ friend, onClick, own }) => {
    const [realMojis, setRealMojis] = useState([])
    const [allRealMojis, setAllRealMojis] = useState([])
    const [moreRealMojis, setMoreRealMojis] = useState(0)

    const [post, setPost] = useState(null)

    const [back, setBack] = useState()
    const [front, setFront] = useState()
    const [inverted, setInverted] = useState(false)

    const [count, setCount] = useState("")
    
    const [currentPostIndex, setCurrentPostIndex] = useState(0)

    const maxRealMojis = 5

    const getRealMojis = (mojiData) => {
        let mojis = []
        let moreMojis = 0

        let allMojis = []

        mojiData.map((realMoji, index) => {
            if (mojis.length < maxRealMojis) mojis.push(realMoji)
            else moreMojis += 1
            
            allMojis.push(realMoji)
            
            if (index == maxRealMojis) moreMojis += 1
        });

        if (moreMojis == 1)
        {
            mojis.push(mojiData[mojis.length])
            moreMojis = 0
        }

        setRealMojis(mojis)
        setAllRealMojis(allMojis)
        setMoreRealMojis(moreMojis)
    }
    
    const swapCameras = () => {
        let temp = back
        setBack(front)
        setFront(temp)

        setInverted(!inverted)
    }
    
    const nextPost = () => {
        if (currentPostIndex + 1 < friend.posts.length)
        {
            let post = friend.posts[currentPostIndex + 1]
        
            setBack(post.primary.url)
            setFront(post.secondary.url)
            getRealMojis(post.realMojis)
            setPost(post)
            setCurrentPostIndex(currentPostIndex + 1)
            updateBeRealCount()
        }
        else
        {
            let post = friend.posts[0]
            
            setBack(post.primary.url)
            setFront(post.secondary.url)
            getRealMojis(post.realMojis)
            setPost(post)
            setCurrentPostIndex(0)
            updateBeRealCount(0)
        }
    }

    const updateBeRealCount = () => {
        let index = currentPostIndex + 1 >= friend.posts.length ? 0 : currentPostIndex + 1;
        
        let dots = ""
        
        for (let i = 0; i < friend.posts.length; i++) dots += "⦾ ";
        dots = dots.substring(0, index * 2) + "⦿ " + dots.substring(index * 2 + 1);  

        setCount(dots)
    }


    useEffect(() => {
        nextPost()
    }, []);
        
    return (
        <>
            {
                post ?
                <div className={`bereal max-w-xl w-full h-fit relative flex flex-col items-center gap-6 py-6 rounded-3xl ${own ? "border-gray-500" : "border-neutral-800"} border-2 bg-neutral-950 m-5`}>
                    <ProfileInfo data={post} user={friend.user} />
                    <div className="images w-5/6 h-fit flex items-center justify-center relative">
                        <div className="primary w-full" onClick={() => { nextPost() }}>
                            <img src={back} alt="" className='rounded-3xl border-black border-2' />
                        </div>
                        <div className="secondary w-1/4 absolute top-1 left-1" onClick={() => { swapCameras() }}>
                            <img src={front} alt="" className='rounded-3xl border-black border-2'/>
                        </div>
                        <div className={`realmojis max-w-[90%] w-full h-full absolute bottom-2 flex ${allRealMojis.length > 5 ? "justify-start max-h-[12.5%]" : "justify-center max-h-[11.5%]"} gap-4 overflow-auto`}>
                            {allRealMojis.map((realMoji, index) => (
                                <RealMoji key={index} data={realMoji} onClick={onClick} />
                            ))}
                        </div>
                    </div>    
                    {post.caption ? <p className='st overflow-clip text-ellipsis text-center max-w-full'>{post.caption}</p> : ''}
                     

                    {post.location ? <Location data={post.location} /> : ''}    
                    <div className="bottom flex relative items-center justify-between w-5/6">
                            <button className="realmojis flex items-center justify-center gap-2 text-xs w-12" onClick={() => onClick(true, { "id": post.id, "userId": friend.user.id, "username": friend.user.username}, 'react')}><FontAwesomeIcon icon={faSmile} className='h-5' /></button>
                        <p className="bereal-count w-fit">{count}</p>    
                        <button className="comments flex items-center justify-center gap-2 text-xs w-12" onClick={() => onClick(true, { "comments": post.comments, "id": post.id }, 'comments')}><FontAwesomeIcon icon={faCommentDots} className='h-5' />({post.comments.length})</button>
                    </div>
                </div> : ''
            }
        </>
    )
}

BeReal.propTypes = {
    friend: PropTypes.object,
    onClick: PropTypes.func,
    own: PropTypes.bool
}

export default BeReal