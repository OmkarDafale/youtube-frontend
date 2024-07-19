import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getVideoById } from '../store/Slices/videoSlice'
import { useParams } from 'react-router-dom'
import Video from './Video'
import VideoDescription from './VideoDescription'
import Comment from './Comment'
import Loader from './Loader'
const VideoDetail = () => {
    const videoId = useParams()
    const dispatch = useDispatch()
    const video = useSelector((state) => state.video?.video)
    const loading = useSelector((state) => state.video?.loading)

    useEffect(() => {
        dispatch(getVideoById(videoId))
    }, [])

    console.log(video?.isLiked)
    return (
        <div className='px-2 flex flex-col py-5'>
            {
                loading ? <Loader /> : (
                    <>
                        <Video src={video?.videoFile?.url} poster={video?.thumbnail?.url} />
                        <VideoDescription
                            avatar={video?.owner?.avatar.url}
                            channelName={video?.owner?.username}
                            createdAt={video?.createdAt}
                            description={video?.description}
                            isSubscribed={video?.owner?.isSubscribed}
                            likesCount={video?.likesCount}
                            subscribersCount={video?.owner?.subscribersCount}
                            title={video?.title}
                            views={video?.views}
                            key={video?._id}
                            isLiked={video?.isLiked}
                            videoId={video?._id}
                            channelId={video?.owner?._id}
                        />
                        <Comment videoId={video?._id} />
                    </>
                )
            }
        </div>
    )
}

export default VideoDetail