import PropTypes from 'prop-types'

const ProfileInfo = ({ user, data }) => {


    const getTimeFromDate = (date) => {
        const data = new Date(date)

        return data.toLocaleTimeString()
    }

    const getTime = () => {
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
        
        
        if (!data.isLate || (data.isLate && !data.isMain)) finalString += getTimeFromDate(data.postedAt)
        else finalString += `${getTimeFromDate(data.postedAt)} (${lateString})`
        

        return finalString
    }

    return (
        <>
            {
                user && data ?
                    <div className="profileInfo w-5/6 h-fit flex items-center gap-3">
                            {
                                user.profilePicture ? <img src={user.profilePicture.url} alt="" className='w-20 rounded-full border-black border-2' /> :
                                    <p className='picture w-16 aspect-square flex items-center justify-center bg-gray-500 rounded-full border-black border-2'>{(user.username).charAt(0)}</p>
                            }
                            <div className="info w-fit flex flex-col text-left">
                                <p className="name text-2xl font-semibold">{user.username}</p>
                            <p className="time text-base font-light">{getTime()}</p>
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