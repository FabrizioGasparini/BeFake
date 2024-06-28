import './ProfileInfo.css'
import PropTypes from 'prop-types'
import getAddressFromCoordinates from '../utils/GetLocation'
import { useState, useEffect } from 'react'

const ProfileInfo = ({ user, data }) => {
    const [location, setLocation] = useState(null)

    useEffect(() => {
        const loadLocation = async () => {
            if(location != null || data.location == null) return
            setLocation(await getAddressFromCoordinates(data.location.latitude, data.location.longitude))
        }

        loadLocation()
    }, []);

    const getTimeFromDate = (date) => {
        const data = new Date(date)

        return data.toLocaleTimeString()
    }

    const getLocationTime = () => {
        var lateString = ""
        
        if (data.isLate)
        {
            var late = data.lateInSeconds
        
            if (late > 3600)
            {
                lateString = Math.ceil(late / 3600) + " h in ritardo"    
            }
            else if (late > 60)
            {        
                lateString = Math.ceil(late / 60) + " min in ritardo"    
            }
            else
            {
                lateString = late + " sec in ritardo"
            }
        }

        var finalString = ""

        if (data.origin) if(data.origin == "repost") finalString += "🔃 " + data.parentPostUsername + " • "
        

        if (location)
        {
            if (!data.isLate || (data.isLate && !data.isMain)) finalString += `${location} • ${getTimeFromDate(data.postedAt)}`
            else finalString += `${location} • ${getTimeFromDate(data.postedAt)} (${lateString})`
        }
        else
        {
            if (!data.isLate || (data.isLate && !data.isMain)) finalString += getTimeFromDate(data.postedAt)
            else finalString += `${getTimeFromDate(data.postedAt)} (${lateString})`
        }

        return finalString
    }

    return (
        <>
            {
                user && data ?
                    <div className="profileInfo">
                            {
                                user.profilePicture ? <img src={user.profilePicture.url} alt="" /> :
                                    <p className='picture'>{(user.username).charAt(0)}</p>
                            }
                            <div className="info">
                                <p className="name">{user.username}</p>
                            <p className="location-time">{getLocationTime()}</p>
                            </div>
                    </div> : ''
            }
        </>
    )
}

export default ProfileInfo

ProfileInfo.propTypes = {
    data: PropTypes.object,
    user: PropTypes.object,
}