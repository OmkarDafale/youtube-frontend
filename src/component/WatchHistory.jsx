import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import VideoList from './VideoList'
import { userWatchHistory } from '../store/Slices/userSlice'

const WatchHistory = () => {
    const watchHistory = useSelector((state) => state?.user?.watchHistory)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userWatchHistory())
    }, [])
    
    return (
        <div className='py-5'>
            <h1 className='text-2xl font-bold text-white'>Watch History</h1>
            <div className='text-white mb-20 sm:m-0 max-h-screen w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll'>
                {
                    watchHistory.map((video) => (
                        <VideoList
                            key={video._id}
                            thumbnail={video.thumbnail?.url}
                            duration={video.duration}
                            title={video.title}
                            views={video.views || 0}
                            avatar={video.owner?.avatar.url}
                            channelName={video.owner?.username}
                            createdAt={video.createdAt}
                            videoId={video._id}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default WatchHistory