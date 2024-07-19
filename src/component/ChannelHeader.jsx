import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

const ChannelHeader = ({username,fullName,email,avatar,coverImage}) => {
    return (
        <div className='flex flex-col w-full h-[300px] border-b border-l'>
            <div className='h-5/6 flex items-center justify-between px-10' style={{backgroundImage:`url(${coverImage})`, backgroundRepeat:'no-repeat', backgroundSize:'cover' }}>
                <div className='flex items-center bg-black/50 p-2 rounded-lg'>
                    <img src={avatar} alt="avatar" className='rounded-full sm:w-32 w-28 sm:h-32 h-28"' />
                    <div className='flex flex-col px-2 text-white'>
                        <h1 className='font-bold text-2xl'>{fullName}</h1>
                        <p className='text-sm'>@{username}</p>
                        <p className='text-sm'>{email}</p>
                    </div>
                </div>
                    <Button className='bg-purple-500 px-4 py-2'>
                        <span>Edit</span>
                    </Button>

            </div>
            <div className='h-1/6 flex justify-around items-end px-10'>
                <Link className='bg-[#FFFFFF] py-2 px-4 border-b-4 border-purple-500'>
                    <span className='text-purple-500'>Videos</span>
                </Link>
                <Link className='py-2 px-4'>
                    <span className='text-white'>Upload Video</span>
                </Link>
                <Link className='py-2 px-4 '>
                    <span className='text-white'>Subscriber</span>
                </Link>
            </div>
        </div>
    )
}

export default ChannelHeader