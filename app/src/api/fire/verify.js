import axios from "../axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies()

export const getTokens = async (otp) => {
    var refreshToken = null
    try
    {
        const refreshTokenRequest = await axios.post(
            '/https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPhoneNumber?key=AIzaSyCgNTZt6gzPMh-2voYXOvrt_UR_gpGl83Q',
            {
                "code": otp,
                "sessionInfo": cookies.get('sessionInfo'),
                "operation": "SIGN_UP_OR_IN"
            },
            {
                "headers": {
                    'User-Agent': 'FirebaseAuth.iOS/9.6.0 AlexisBarreyat.BeReal/0.31.0 iPhone/14.7.1 hw/iPhone9_1',
                    'x-ios-bundle-identifier': 'AlexisBarreyat.BeReal',
                    'Content-Type': 'application/json',
                    'bereal-app-version-code': '14549',
                    'bereal-device-id': '937v3jb942b0h6u9',
                    'bereal-timezone': 'Europe/Paris',
                    'bereal-signature': 'MToxNzE5NjA3NTU2OmCtIh76SvQmaQ9wi9RlLCdo5dkGChGNJQbMZcudzS/Y',
                    'x-client-version': 'iOS/FirebaseSDK/9.6.0/FirebaseCore-iOS',
                    'x-firebase-locale': 'en',
                    'x-firebase-gmpid': '1:405768487586:ios:28c4df089ca92b89'
                }
            }
        )
    
        refreshToken = await refreshTokenRequest.data.refreshToken
    }
    catch (error)
    {
        console.error(error)
        if(error.response.data == "See /corsdemo for more info\n") window.open('https://cors-anywhere.herokuapp.com/corsdemo', '_blank')
        return null
    }

    var firebaseToken = null
    try
    {
        const firebaseTokenRequest = await axios.post(
            '/https://securetoken.googleapis.com/v1/token?key=AIzaSyCgNTZt6gzPMh-2voYXOvrt_UR_gpGl83Q',
            {
                "grantType": "refresh_token",
                "refreshToken": refreshToken
            },
            {
                "headers": {
                    "Accept": "application/json",
                    "User-Agent": "BeReal/8586 CFNetwork/1240.0.4 Darwin/20.6.0",
                    "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
                    "Content-Type": "application/json"
                }
            }
        )
        
        firebaseToken = await firebaseTokenRequest.data.id_token
    }
    catch (error)
    {
        console.error(error)
        if(error.response.data == "See /corsdemo for more info\n") window.open('https://cors-anywhere.herokuapp.com/corsdemo', '_blank')
        return null
    }
    
    var tokens = null
    try
    {
        const tokensRequest = await axios.post(
            '/http://auth.bereal.team/token?grant_type=firebase',
            {
                "grant_type": "firebase",
                "client_id": "ios",
                "client_secret": "962D357B-B134-4AB6-8F53-BEA2B7255420",
                "token": firebaseToken
            },
            {
                "headers": {
                    "Accept": "application/json",
                    "User-Agent": "BeReal/8586 CFNetwork/1240.0.4 Darwin/20.6.0",
                    "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
                    "Content-Type": "application/json",
                    "bereal-app-version-code": "14549",
                    "bereal-signature": "MToxNzE5ODMwNzIwOr0JEVaq1hBgmjldKj0/GIKRVwoYj2uBIyjuyrSUdH8Q",
                    "bereal-device-id": "937v3jb942b0h6u9",
                    "bereal-timezone": "Europe/Paris"
                }
            }
        )

        tokens = { accessToken: await tokensRequest.data.access_token, refreshToken: await tokensRequest.data.refresh_token }
    }
    catch (error)
    {
        console.error(error)
        if(error.response.data == "See /corsdemo for more info\n") window.open('https://cors-anywhere.herokuapp.com/corsdemo', '_blank')
        return null
    }
    
    return tokens
}

