import './RealMoji.css'
import PropTypes from 'prop-types'

const RealMoji = ({ data, moreRealMojis }) => {
    return (
        <div className="realmoji">
            <img src={data.media.url} alt="" className={moreRealMojis ? 'more' : ''} /> 
            {
                moreRealMojis ? <p>+ {moreRealMojis}</p> : ''
            }
            <h1 className="emoji">{data.emoji}</h1>
        </div>
    )
}

RealMoji.propTypes = {
    data: PropTypes.any,
    moreRealMojis: PropTypes.number
}

export default RealMoji