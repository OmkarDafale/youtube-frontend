import React, { useEffect, useId } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSubscribedChannel } from '../store/Slices/subscriptionSlice'
import VideoList from './VideoList'

const UserSubscribedChannel = () => {

    const subscribedChannel = useSelector((state) => state.subscription?.subscribedChannel)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSubscribedChannel())
    }
        , [])
    return (
        <div className='py-5'>
            <h1 className='text-2xl font-bold text-white'>Subscribed Channel</h1>
            <div className='text-white mb-20 sm:m-0 max-h-screen w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll'>
                {
                    subscribedChannel.map((video) => (
                        <VideoList
                            key={video.subscribedChannel.latestVideo._id}
                            thumbnail={video.subscribedChannel.latestVideo.thumbnail?.url}
                            duration={video.subscribedChannel.latestVideo.duration}
                            title={video.subscribedChannel.latestVideo.title}
                            views={video.subscribedChannel.latestVideo.views || 0}
                            avatar={video.subscribedChannel.avatar.url}
                            channelName={video.subscribedChannel.username}
                            createdAt={video.subscribedChannel.latestVideo.createdAt}
                            videoId={video.subscribedChannel.latestVideo._id}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default UserSubscribedChannel