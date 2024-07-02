import axios from "../axios";

export const refreshTokens = async (refreshToken) => {
    var tokens = null
    try
    {
        const tokensRequest = await axios.post(
            '/https://auth.bereal.team/token?grant_type=refresh_token',
            {
                "grant_type": "refresh_token",
                "client_id": "ios",
                "client_secret": "962D357B-B134-4AB6-8F53-BEA2B7255420",
                "refresh_token": refreshToken
            },
            {
                "headers": {
                    "Accept": "application/json",
                    "User-Agent": "BeReal/8586 CFNetwork/1240.0.4 Darwin/20.6.0",
                    "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
                    "Content-Type": "application/json",
                    "bereal-app-version-code": "14549",
                    "bereal-device-id": "937v3jb942b0h6u9",
                    "bereal-timezone": "Europe/Paris"
                }
            }
        )

        console.log("Request: ", tokensRequest)

        tokens = { accessToken: tokensRequest.data.access_token, refreshToken: tokensRequest.data.refresh_token }
    }
    catch (error)
    {
        console.error(error)
        if(error.response.data == "See /corsdemo for more info\n") window.open('https://cors-anywhere.herokuapp.com/corsdemo', '_blank')
        return null
    }
    
    return tokens
}