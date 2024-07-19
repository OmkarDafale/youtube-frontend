import React from 'react'
import { Link } from 'react-router-dom'
import { FaYoutube } from "react-icons/fa";


const Logo = ({size="30px"}) => {
  return (
    <Link to='/' className='flex gap-2 items-center'>
        <FaYoutube 
        size={size}
        color='#fff'
        />
        <span className='font-bold text-white'>YOUTUBE</span>
    </Link>
  )
}

export default Logo