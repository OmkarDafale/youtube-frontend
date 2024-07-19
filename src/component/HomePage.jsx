import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVideos, makeVideosNull } from '../store/Slices/videoSlice'
import VideoList from './VideoList'

const HomePage = () => {
    const dispatch = useDispatch()
    const videos = useSelector((state) => state.video?.videos?.docs)
    const loading = useSelector((state) => state.video?.loading)
    const hasNextPage = useSelector((state) => state.video?.videos?.hasNextPage)

    const [page, setPage] = useState(1)
    useEffect(() => {
        dispatch(getAllVideos({}))
        return (() => dispatch(makeVideosNull()))
    }, [])
    return (
        <div className='py-5'>
            <h1 className='text-2xl font-bold text-white'>Home</h1>
            <div className='text-white mb-20 sm:m-0 max-h-screen w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll'>
                {videos.map((video) => (
                    <VideoList
                        key={video._id}
                        thumbnail={video.thumbnail?.url}
                        duration={video.duration}
                        title={video.title}
                        views={video.views || 0}
                        avatar={video.ownerDetails?.avatar.url}
                        channelName={video.ownerDetails.username}
                        createdAt={video.createdAt}
                        videoId={video._id}
                    />
                ))}
            </div>
        </div>
    )
}

export default HomePage