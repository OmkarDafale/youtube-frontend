import React, { useEffect, useState } from 'react'
import { BsDot } from './icons'
import Button from './Button'
import {useDispatch } from 'react-redux'
import { timeAgo } from '../helper/timeAgo.js'
import { toggleSubscriber } from '../store/Slices/subscriptionSlice'
import Like from './Like'

const VideoDescription = ({
  avatar, channelName, createdAt, description, isSubscribed, likesCount, subscribersCount, title, views, isLiked, videoId, channelId,
}) => {

  const [subscribersCountLocal, setsubscribersCountLocal] = useState(subscribersCount)
  const [isSubscribedLocal, setIsSubscribedLocal] = useState(isSubscribed)

  const dispatch = useDispatch()
  const handleSubscription = () => {
    dispatch(toggleSubscriber(channelId))
    setIsSubscribedLocal((prev) => !prev)
    setsubscribersCountLocal((prev) => {
      return isSubscribedLocal ? prev - 1 : prev + 1
    })
  }

  return (
    <div className='pb-5 sm:max-w-4xl w-full flex flex-col px-5 text-white'>
      <div className='border-b-[1px] py-2 border-slate-400'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <div className='flex gap-1 text-sm items-center text-slate-400'>
          <span>{views} views</span>
          <BsDot />
          <span>{timeAgo(createdAt)}</span>
          <div className='text-xl bg-[#222222] px-2 py-2 rounded-full flex gap-2 items-center'>
            <Like videoId={videoId} isLiked={isLiked} likesCount={likesCount} />
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <img src={avatar} alt="" className='w-10 h-10 rounded-full' />
            <div className='flex flex-col'>
              <span>{channelName}</span>
              <span className='text-xs text-slate-400'>{subscribersCountLocal} Subscribers</span>
            </div>
          </div>
          <div>
            <Button onClick={handleSubscription} className='bg-purple-500 px-2 py-2'>{isSubscribedLocal ? 'Subscribed' : 'Subscribe'}</Button>
          </div>
        </div>
      </div>
      <div className='bg-[#222] mt-2 py-2 text-sm rounded-lg'>
        <span className='px-2 py-2'>{description}</span>
      </div>
    </div>
  )
}

export default VideoDescription
