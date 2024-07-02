import PropTypes from 'prop-types'
import RealMoji from './RealMoji'
import ProfileInfo from './ProfileInfo'

import { useState, useEffect } from 'react'
import Location from './Location'

const BeReal = ({ friend, onClickRealMoji }) => {
    const [realMojis, setRealMojis] = useState([])
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

        mojiData.map((realMoji, index) => {
            if (mojis.length < maxRealMojis) mojis.push(realMoji)
            else moreMojis += 1
            
            if (index == maxRealMojis) moreMojis += 1
        });

        if (moreMojis == 1)
        {
            mojis.push(mojiData[mojis.length])
            moreMojis = 0
        }

        setRealMojis(mojis)
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
            updateBeRealCount()
        }
    }

    const updateBeRealCount = () => {
        switch (friend.posts.length)
        {
            default:
                setCount("●")
                break

            case 2:
                if (currentPostIndex - 1 == 0) setCount("● ○")
                else setCount("○ ●")
                break
            
            case 3:
                if (currentPostIndex - 1 == 0) setCount("● ○ ○")
                else if (currentPostIndex - 1 == 1) setCount("○ ● ○")
                else setCount("○ ○ ●")
                break
        }
    }


    useEffect(() => {
        nextPost()
    }, []);
        
    return (
        <>
            {
                post ?
                <div className="bereal max-w-xl w-full h-fit relative flex flex-col items-center gap-6 py-6 rounded-3xl border-neutral-800 border-2 bg-neutral-950 m-5">
                    <ProfileInfo data={post} user={friend.user} />
                    <div className="images w-5/6 h-fit flex items-center justify-center relative">
                        <div className="primary w-full" onClick={() => { nextPost() }}>
                            <img src={back} alt="" className='rounded-3xl border-black border-2' />
                        </div>
                            <div className="secondary w-1/4 absolute top-1 left-1" onClick={() => { swapCameras() }}>
                            <img src={front} alt="" className='rounded-3xl border-black border-2'/>
                        </div>
                        <div className="realmojis w-fit h-[11%] absolute bottom-2 flex items-center justify-center gap-4">
                            {realMojis.map((realMoji, index) => (
                                <RealMoji key={index} data={realMoji} moreRealMojis={index < realMojis.length - 1 ? null : moreRealMojis} onClick={onClickRealMoji} />
                            ))}
                        </div>
                    </div>    
                    
                    {post.caption ? <p className='st overflow-clip text-ellipsis text-center max-w-full'>{post.caption}</p> : ''}

                    {post.location ? <Location data={post.location} /> : ''}    
                    <p className="bereal-count w-fit">{count}</p>    
                </div> : ''
            }
        </>
    )
}

BeReal.propTypes = {
    friend: PropTypes.object,
    onClickRealMoji: PropTypes.func
}

export default BeReal