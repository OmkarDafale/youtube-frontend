import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLikedVidoes } from '../store/Slices/likeSlice'
import VideoList from './VideoList'

const UsersLikedVideos = () => {
    const likedVideo = useSelector((state) => state?.like.likedVideos)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllLikedVidoes())
    }, [])

    return (
        <div className='py-5'>
            <h1 className='text-2xl font-bold text-white'>Liked Videos</h1>
            <div className='text-white mb-20 sm:m-0 max-h-screen w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll'>
                {
                    likedVideo.map((video) => (
                        <VideoList
                            key={video.likedVideo._id}
                            thumbnail={video.likedVideo.thumbnail?.url}
                            duration={video.likedVideo.duration}
                            title={video.likedVideo.title}
                            views={video.likedVideo.views || 0}
                            avatar={video.likedVideo.ownerDetails?.avatar.url}
                            channelName={video.likedVideo.ownerDetails.username}
                            createdAt={video.likedVideo.createdAt}
                            videoId={video.likedVideo._id}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default UsersLikedVideos