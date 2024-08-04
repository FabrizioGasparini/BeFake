import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const RealMoji = ({ data, moreRealMojis, onClick, big }) => {
    return (
        <div className={`realmoji h-full ${big ? "w-11/12" : ""} aspect-square relative flex items-center justify-center ${Object.keys(data).includes('user') && cookies.get("userId") == data.user.id ? "border-gray-300 bg-white": "border-neutral-800 bg-black"} border-2 rounded-full`} onClick={() => onClick(true, data, 'realmoji')}>
            <img src={data.media.url} alt="" className='h-full aspect-square rounded-full' /> 
            {
                moreRealMojis ?
                    <p className='w-full h-full absolute flex items-center justify-center bg-black bg-opacity-50 rounded-full text-sm'>+ {moreRealMojis}</p>
                    : ''
            }
            <h1 className={`emoji absolute right-0 bottom-0 ${big ? 'text-[85px]' : 'text-2xl'}`}>{data.emoji}</h1>
        </div>
    )
}

RealMoji.propTypes = {
    data: PropTypes.any,
    moreRealMojis: PropTypes.number,
    onClick: PropTypes.func,
    big: PropTypes.bool
}

export default RealMoji