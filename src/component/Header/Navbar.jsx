import React, { useState } from 'react'
import {Logo, Search } from '../index.js'
import {
    IoMenu, IoCloseCircleOutline, FaHome, BiSolidLike, IoMdLogOut, CiSearch
} from '../icons.js'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLogout } from '../../store/Slices/authSlice.js'


const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    const [setsmSearch, setsetsmSearch] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const authStatus = useSelector((state) => state.auth?.status)
    const fullName = useSelector((state) => state.auth?.userData?.fullName)
    const avatar = useSelector((state) => state.auth?.userData?.avatar.url)

    const logout = async () => {
        await dispatch(userLogout())
        navigate('/')
    }


    const sidePanelItems = [
        {
            icon: <FaHome size={24} />,
            title: 'Home',
            url: '/'
        },
        {
            icon: <BiSolidLike size={24} />,
            title: 'Liked Videos',
            url: '/'
        },

    ]
    return (
        <div className='w-full flex justify-between px-5 h-20 items-center border-b-[1px] bg-[#0F0F0F] border-white z-50 sticky top-0'>
            <div className=''>
                <Logo />
            </div>
            <div className='w-full sm:w-1/3  hidden sm:block'>
                <Search />
            </div>

            <div className='space-x-2 hidden sm:block'>
                {
                    authStatus ? (
                        <img src={avatar} alt='avatar' className='w-10 h-10 bg-red-400 rounded-full' />
                    )
                        :
                        (
                            <>
                                <Link to='/login' className='border-white text-white border-[1px] px-4 py-2 hover:bg-[#222222]'>
                                    Login
                                </Link>
                                <Link to='/signup' className='border-white text-white border-[1px] px-4 py-2 hover:bg-[#222222]'>
                                    Sign In
                                </Link>
                            </>
                        )
                }
            </div>

            <div className='sm:hidden flex items-center gap-2'>
                <div className='sm:hidden flex items-center gap-2'>
                    <div className={`${setsmSearch ? 'block' : 'hidden'} ml-5 w-full flex gap-2`}>
                        <Search />
                    </div>
                    <CiSearch className='hover:scale-125 duration-200' onClick={() => {
                        setsetsmSearch((prev) => !prev)
                    }}
                        color='#fff'
                        size={24}
                    />
                </div>
                <IoMenu className='hover:scale-125 duration-200' onClick={() => {
                    setToggle(true)
                }}
                    size={24}
                    color='#fff'
                />
            </div>
            {
                toggle && (
                    <div className='fixed w-[70%] h-full bg-[#222222] top-0 right-0 py-5 rounded-l-xl md:hidden sm:block'>
                        <div className='flex px-4  justify-between items-center border-b-2 border-white pb-5'>
                            <Logo />
                            <IoCloseCircleOutline size={24} color='#fff' className='hover:scale-125 duration-200' onClick={() => setToggle(false)} />
                        </div>
                        <div className='px-4 py-4 flex flex-col gap-3 h-full justify-between'>
                            <div className="flex flex-col gap-3">
                                {sidePanelItems.map((item) => (
                                    <a
                                        href={item.url}
                                        key={item.title}
                                        onClick={() => (
                                            setToggle((prev) => !prev)
                                        )}
                                        className='hover:bg-[#0F0F0F]'
                                    >
                                        <div className='flex items-center gap-5 border text-white px-2 py-2 rounded-md'>
                                            <div>{item.icon}</div>
                                            <span className='text-lg'>
                                                {item.title}
                                            </span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                            {
                                authStatus ?
                                    (
                                        <div className='flex justify-between items-center pb-10'>
                                            <div className='flex items-center gap-3'>
                                                <img src={avatar} alt="avatar" className='w-[50px] rounded-full' />
                                                <span className='text-lg text-white'>
                                                    {fullName}
                                                </span>
                                            </div>
                                            <div onClick={logout} className=' hover:scale-125 duration-200 text-white '>
                                                <span className='text-lg '>
                                                    <IoMdLogOut size={24} />
                                                </span>
                                            </div>
                                        </div>
                                    )
                                    : (
                                        <div className='py-10 flex flex-col gap-2'>
                                            <a className='flex items-center justify-center gap-5 border text-white px-2 py-2 hover:bg-[#0F0F0F]'>
                                                <span className='text-lg'>
                                                    Login
                                                </span>
                                            </a>
                                            <a className='flex items-center justify-center gap-5 border text-white px-2 py-2 hover:bg-[#0F0F0F]'>
                                                <span className='text-lg'>
                                                    Sign In
                                                </span>
                                            </a>
                                        </div>
                                    )
                            }

                        </div >
                    </div >
                )
            }
        </div >
    )
}

export default Navbar