import './BeReal.css'

import PropTypes from 'prop-types'
import RealMoji from './RealMoji'
import ProfileInfo from './ProfileInfo'

import { useState, useEffect } from 'react'

const BeReal = ({ data, friend }) => {
    const [realMojis, setRealMojis] = useState([])
    const [moreRealMojis, setMoreRealMojis] = useState(0)

    const [post, setPost] = useState(null)

    const [back, setBack] = useState(data.primary.url)
    const [front, setFront] = useState(data.secondary.url)
    
    const [currentPostIndex, setCurrentPostIndex] = useState(-1)

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
        }
        else
        {
            let post = friend.posts[0]
            
            setBack(post.primary.url)
            setFront(post.secondary.url)
            getRealMojis(post.realMojis)
            setPost(post)
            setCurrentPostIndex(0)
        }
    }
        
    useEffect(() => {
        if(friend.posts) nextPost()
        else getRealMojis(data.realMojis)
    }, []);
        
    return (
        <>
            {
                post ?
                <div className="bereal">
                    <ProfileInfo data={post} user={friend.user} />
                    <div className="primary" onClick={() => {nextPost()}}>
                    <img src={back} alt="" />
                    </div>
                    <div className="secondary" onClick={() => { swapCameras() }}>
                    <img src={front} alt="" />
                    </div>
                    <div className="realmojis">
                    {realMojis.map((realMoji, index) => (
                        <RealMoji key={index} data={realMoji} moreRealMojis={index < realMojis.length - 1 ? null : moreRealMojis} />
                    ))}
                    </div>
                </div> : ''
            }
        </>
    )
}

BeReal.propTypes = {
    data: PropTypes.any,
    friend: PropTypes.object
}

export default BeReal