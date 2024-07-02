import PropTypes from 'prop-types'

const RealMoji = ({ data, moreRealMojis, onClick, big }) => {
    return (
        <div className={`realmoji ${big ? 'h-[300px]' : 'h-full'} aspect-square relative flex items-center justify-center bg-black border-neutral-800 border-2 rounded-full`} onClick={() => onClick(true, data)}>
            <img src={data.media.url} alt="" className='h-full aspect-square rounded-full' /> 
            {
                moreRealMojis ? <p className='w-full h-full absolute flex items-center justify-center bg-black bg-opacity-50 rounded-full text-sm'>+ {moreRealMojis}</p> : ''
            }
            <h1 className={`emoji absolute right-0 bottom-0 ${big ? 'text-[85px]' : 'text-2xl'} sm:text-[5px]`}>{data.emoji}</h1>
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