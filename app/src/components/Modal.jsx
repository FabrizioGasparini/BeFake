import PropTypes from 'prop-types'
import RealMoji from './bereal/RealMoji'

const Modal = ({ visible, data, hide }) => {
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
    
        if (time > 3600)
        {
            timeString = Math.ceil(time / 3600) + " h fa"    
        }
        else if (time > 60)
        {        
            timeString = Math.ceil(time / 60) + " min fa"    
        }
        else
        {
            timeString = time + " sec fa"
        }
        
        return `${getTimeFromDate(data.postedAt)} • ${timeString}`
    }


    return (
        <>
            {
                data && data.user ?
                    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm ${visible ? '' : 'hidden'}`} onClick={hide}>
                        <div className="realmoji max-w-xl w-full h-7/12 relative flex flex-col items-center gap-6 py-6 rounded-3xl border-neutral-800 border-2 bg-neutral-950 m-5">
                            <div className="font-light text-3xl -mb-4">RealMoji di <span className='font-semibold'>{data.user.username}</span></div>
                            <p className="time text-base font-extralight">{getTime()}</p>
                            <div className="separator w-11/12 h-0.5 bg-neutral-800"></div>
                            <RealMoji data={data} moreRealMojis={0} onClick={{}} big/>
                        </div>
                    </div> : ''
            }
        </>
    )
}

Modal.propTypes = {
    visible: PropTypes.bool,
    data: PropTypes.object,
    hide: PropTypes.func
}

export default Modal