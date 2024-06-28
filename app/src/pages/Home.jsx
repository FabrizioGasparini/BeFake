import './Home.css'

import { useEffect, useState } from 'react'

import BeReal from '../components/BeReal'

import axios from '../api/axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const Home = () => {
    const [data, setData] = useState(null)

    const refreshToken = async () => {
        const currentToken = cookies.get("token")
        
        try {
            const response = await axios.post('/login/refresh', { token: currentToken })
            
            cookies.set('token', response.data.data.token)
            getData()
        } catch (error) {
            console.error(error)
        }
    }
    
    const getData = async () => {
        if (data != null) return
        
        try {
            const token = cookies.get("token")
            axios.defaults.headers.common = { 'token': token }

            const response = await axios.get('/friends/feed')

            setData(response.data.data.data)
        } catch (error) {
            refreshToken()
            console.error(error)
        }
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        <>
            <h1 className="hl">BeReal.</h1>
            {data != null ? (
                <>
                    <p className="st">I tuoi BeReal.</p>
                    <div className="userPosts">
                        {
                            data.userPosts ?
                            data.userPosts.posts.map((post, index) => (
                                <BeReal
                                    key={index}
                                    data={post}
                                />
                            )) : <h1 className='st'><br /><br />Non hai ancora caricato un BeReal.</h1>
                        }
                    </div>
                    <p className="st">I BeReal. dei tuoi amici</p>
                    <div className="friendsPosts">
                        {
                            data.friendsPosts.map((friend, index) => (
                                <>
                                    <div className="posts" key={index}>
                                        <BeReal
                                            data={{ "primary": "", "secondary": "" }}
                                            friend={friend}
                                        />
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </>) : <h1 className='hl'><br /><br />Caricando i BeReal...</h1>
            }
        </>
    )
}

export default Home