const Comment = (data) => {
    const getTime = (date) => {
        const data = new Date(date)

        return data.toLocaleTimeString()
    }

    return (
        <>
        {
            data.data ? <div className="comment w-full h-fit bg-neutral-900 rounded-full flex items-center justify-center relative p-2">
                <div className="user flex items-center w-full gap-2">
                    {
                        data.data.user.profilePicture ?
                            <img src={data.data.user.profilePicture.url} alt="" className='w-10 rounded-full border-black border-2' />
                            :
                            <p className='picture w-16 aspect-square flex items-center justify-center bg-gray-500 rounded-full border-black border-2'>{(data.data.user.username).charAt(0)}</p>
                    }
                    <div className="info w-fit flex flex-col text-left">
                        <p className="name text-sm">{data.data.user.username} • <span className="font-extralight">{getTime(data.data.postedAt)}</span></p>
                        <p className="position w-full overflow-clip text-ellipsis font-semibold text-lg">{data.data.content}</p>
                    </div>
                </div>
            </div> : ''
        }
        </>
    )
}

export default Comment