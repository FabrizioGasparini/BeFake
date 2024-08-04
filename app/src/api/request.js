import axios from "./axios";
import Cookies from "universal-cookie";

const cookies = new Cookies()

export default async function handler(endpoint, method='get', data=null)
{
    const signature = await getSignature()

    const options = {
        "headers": {
            "bereal-device-id": "937v3jb942b0h6u9",
            "bereal-timezone": "Europe/Paris",
            "bereal-signature": signature,
            "bereal-app-version-code": "14549",
            'Authorization': `Bearer ${cookies.get("token")}`
        }
    }

    const response = await axios({
        "method": method,
        "url": '/https://mobile.bereal.com/api' + endpoint,
        "headers": options.headers,
        "data": data
    })

    return await response
}

const getSignature = async () => {
    try
    {
        const signature = await axios.get('/https://sig.beunblurred.co/get?token=i1w3j4DHDDS82j12')
        return signature.data
    }
    catch (error)
    {
        if (error.response.data == "See /corsdemo for more info\n") window.open('https://cors-anywhere.herokuapp.com/corsdemo', '_blank')
        return null
    }
}

