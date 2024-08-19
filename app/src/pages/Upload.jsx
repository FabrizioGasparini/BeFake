import { useState } from "react";
import request from "../api/request"
import Cookies from "universal-cookie";
import axios from "../api/axios";
import placeholder from '../assets/bereal-placeholder.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies()

const Upload = () => {
    const [primary, setPrimary] = useState(null)
    const [secondary, setSecondary] = useState(null)

    const [retakes, setRetakes] = useState(0)
    const [caption, setCaption] = useState("")

    const navigate = useNavigate()

    const getUrls = async () => {
        try
        {  
            const response = await request("/content/posts/upload-url?mimeType=image/webp", "GET", null)
        
            uploadPhotos(response["data"]["data"])
        }
        catch (error)
        {
            console.error(error)
        }
    }

    const uploadPhotos = async (data) => {
        try
        {
            await axios({
                "method": "PUT",
                "url": `/${data[0]["url"]}`,
                "headers": {
                    'Authorization': `Bearer ${cookies.get("token")}`,
                    'user-agent': 'BeReal/1.0.1 (AlexisBarreyat.BeReal; build:9513; iOS 16.0.2) 1.0.0/BRApriKit',
                    "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
                    "Cache-Control": "public,max-age=2592000",
                    "Content-Type": "image/webp",
                    "x-goog-content-length-range": "1024,1048576"
                },
                "data": primary
            })
            
            await axios({
                "method": "PUT",
                "url": `/${data[1]["url"]}`,
                "headers": {
                    'Authorization': `Bearer ${cookies.get("token")}`,
                    'user-agent': 'BeReal/1.0.1 (AlexisBarreyat.BeReal; build:9513; iOS 16.0.2) 1.0.0/BRApriKit',
                    "x-ios-bundle-identifier": "AlexisBarreyat.BeReal",
                    "Cache-Control": "public,max-age=2592000",
                    "Content-Type": "image/webp",
                    "x-goog-content-length-range": "1024,1048576"
                },
                "data": secondary
            })

            postBereal(data)
        }
        catch (error)
        {
            console.error(error)
        }
    }

    const postBereal = async (data) => {
        const json_data = {
            "visibility": ["friends"],
            "retakeCounter": retakes,
            "takenAt": new Date().toISOString(),
            "isLate": true,
            "backCamera": {
                "bucket": "storage.bere.al",
                "height": 2000,
                "width": 1500,
                "path": data[0]["path"]
            },
            "frontCamera": {
                "bucket": "storage.bere.al",
                "height": 2000,
                "width": 1500,
                "path": data[1]["path"]
            },
        }

        //if (caption != "") json_data["caption"] = caption

        try
        {
            await request("/content/posts", "POST", json_data)

            setPrimary(null)
            setSecondary(null)
        }
        catch (error)
        {
            console.error(error)
        }
    }

    return (
        <>
            <h1 className="hl font-extrabold">BeReal.</h1>
            <div className="back absolute left-10 top-10 text-5xl cursor-pointer" onClick={() => navigate('/')}><FontAwesomeIcon icon={faArrowLeft} /></div>
            <p className="sl text-3xl">Pubblica il tuo BeReal.</p>
                <div className="post w-full flex items-center justify-center mb-12">
                <div className="bereal max-w-xl w-full h-fit relative flex flex-col items-center gap-6 py-6 rounded-3xl border-gray-500 border-2 bg-neutral-950 m-5">
                    <div className="images w-5/6 h-fit flex items-center justify-center relative">
                        <div className="primary w-full" onClick={() => {}}>
                            <img src={primary ? URL.createObjectURL(primary) : "./assets/bereal-placeholder-BWQmqWRy.png"} alt="" className='rounded-3xl border-black border-2 min-w-full min-h-full' onClick={() => setPrimary(null)} />
                            {primary ? "" : <div className="flex items-center justify-center w-full absolute h-full top-0">
                                <label className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-3xl cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-20 h-20 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-xl text-gray-500 dark:text-gray-400"><span className="font-semibold">Premi per caricare</span> o rilascia qui il file</p>
                                        <p className="text-lg text-gray-500 dark:text-gray-400">PNG, JPG or WEBP (1500x2000px)</p>
                                    </div>
                                    <input id="primary-file" type="file" className="hidden" onChange={(event) => {setPrimary(event.target.files[0]); }}/>
                                </label>
                            </div>} 
                        </div>
                        <div className="secondary w-1/4 absolute top-1 left-1" onClick={() => {}}>
                            <img src={secondary ? URL.createObjectURL(secondary) : "./assets/bereal-placeholder-BWQmqWRy.png"} alt="" className='rounded-3xl border-black border-2 min-w-full min-h-full' onClick={() => setSecondary(null)}/>
                            {secondary ? "" : <div className="flex items-center justify-center w-full absolute h-full top-0 overflow-hidden">
                                <label className="p-2 flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-3xl cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-xs text-gray-500 dark:text-gray-400"><span className="font-semibold">Premi per caricare</span> o rilascia qui il file</p>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400">PNG, JPG or WEBP (1500x2000px)</p>
                                    </div>
                                    <input id="secondary-file" type="file" className="hidden" onChange={(event) => { setSecondary(event.target.files[0]); }} />
                                </label>
                            </div>}
                        </div>
                    </div>    
                        
                    <p className='st overflow-clip text-ellipsis text-center max-w-full w-2/3'>
                        <input type="text" className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Caption (NON FUNZIONA)" value={caption} onChange={(e) => setCaption(e.target.value)} disabled />
                    </p>
                        
                    <p className='-mt-4 overflow-clip text-ellipsis text-center max-w-full flex items-center gap-2'>
                        <div className="relative flex items-center max-w-[8rem] h-fit">
                            <button type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-3xl p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none" onClick={() => setRetakes(retakes - 1)}>
                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                </svg>
                            </button>
                            <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" value={retakes} onChange={(e) => {setRetakes(parseInt(e.target.value))}} />
                            <button type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-3xl p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none" onClick={() => setRetakes(retakes + 1)}>
                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                </svg>
                            </button>
                        </div>
                        Retakes
                    </p>
                    {primary && secondary ? <button onClick={() => getUrls()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-normal rounded-full text-3xl px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pubblica <span className="font-bold">BeReal</span></button> : ""}
                </div>
            </div>
        </>
    )
}

export default Upload