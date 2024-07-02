import axios from "../axios";

export const getSessionInfo = async (phoneNumber) => {
    var receipt = null
    try
    {
        const receiptRequest = await axios.post(
            '/https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyClient?key=AIzaSyCgNTZt6gzPMh-2voYXOvrt_UR_gpGl83Q',
            {
                "appToken": "54F80A258C35A916B38A3AD83CA5DDD48A44BFE2461F90831E0F97EBA4BB2EC7"
            },
            {
                "headers": { 
                    'User-Agent': 'FirebaseAuth.iOS/9.6.0 AlexisBarreyat.BeReal/0.31.0 iPhone/14.7.1 hw/iPhone9_1', 
                    'x-ios-bundle-identifier': 'AlexisBarreyat.BeReal', 
                    'Content-Type': 'application/json', 
                    'bereal-app-version-code': '14549', 
                    'bereal-device-id': '937v3jb942b0h6u9', 
                    'bereal-timezone': 'Europe/Paris', 
                    'bereal-signature': 'MToxNzE5ODMwOTIzOs9fJLklTlF7JNtYHWxqhXF+cQwjJL9HNao/+lyb0Pl8', 
                    'x-client-version': 'iOS/FirebaseSDK/9.6.0/FirebaseCore-iOS', 
                    'x-firebase-locale': 'en', 
                    'x-firebase-gmpid': '1:405768487586:ios:28c4df089ca92b89'
                }
            }
        )
        
        receipt = await receiptRequest.data.receipt
    }
    catch (error)
    {
        console.error(error)
        if(error.response.data == "See /corsdemo for more info\n") window.open('https://cors-anywhere.herokuapp.com/corsdemo', '_blank')
        return null
    }

    var sessionInfo = null
    try
    {
        const sessionInfoRequest = await axios.post(
            '/https://www.googleapis.com/identitytoolkit/v3/relyingparty/sendVerificationCode?key=AIzaSyCgNTZt6gzPMh-2voYXOvrt_UR_gpGl83Q',
            {
                "phoneNumber": phoneNumber,
                "iosReceipt": receipt
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

        sessionInfo = await sessionInfoRequest.data.sessionInfo
    }
    catch (error)
    {
        console.error(error)
        if(error.response.data == "See /corsdemo for more info\n") window.open('https://cors-anywhere.herokuapp.com/corsdemo', '_blank')
        return null
    }

    return sessionInfo
}