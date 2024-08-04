import { useEffect, useState } from "react";
import getAddressFromCoordinates from "../../utils/GetLocation";


const Location = (position) => {
    const [location, setLocation] = useState(null)

    useEffect(() => {
        const loadLocation = async () => {
            if(location != null || position.data == null) return
            setLocation(await getAddressFromCoordinates(position.data.latitude, position.data.longitude))
        }

        loadLocation()
    }, []);

    const openMaps = () => {
        window.open(`https://maps.google.com/?q=${position.data.latitude},${position.data.longitude}`, "_blank")
    }

    return (
        <div className="location w-5/6 h-12 bg-neutral-900 rounded-full flex items-center justify-center relative cursor-pointer" onClick={() => {openMaps()}}>
            <p className="absolute left-3">📍</p>
            <p className="position text-base max-w-[75%] text-nowrap w-full overflow-clip text-ellipsis">{location}</p>
        </div>
    )
}

export default Location