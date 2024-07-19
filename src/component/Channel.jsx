import React from 'react'
import ChannelHeader from './ChannelHeader'
import { useSelector } from 'react-redux'

const Channel = () => {
  const userData = useSelector((state)=>state.auth.userData)
  console.log(userData)
  return (
    <div>
        <ChannelHeader username={userData.username} email={userData.email} fullName={userData.fullName} avatar={userData.avatar.url} coverImage={userData.coverImage.url}/>
    </div>
  )
}

export default Channel