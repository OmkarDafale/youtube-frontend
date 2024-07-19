import React from 'react'
import {
    BiHistory,
    BiLike,
    CiSettings,
    HiOutlineVideoCamera,
    IoFolderOutline,
    RiHome6Line,
    TbUserCheck,
    IoMdLogOut
} from "../icons";
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../../store/Slices/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const authStatus = useSelector((state) => state.auth?.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()  
    const logout = async () => {
        await dispatch(userLogout())
        navigate('/')
    }

    const sidebarTopItems = [
        {
            icon: <RiHome6Line size={24} />,
            title: "Home",
            url: "/",
        },
        {
            icon: <BiLike size={24} />,
            title: "Liked Videos",
            url: "/liked-videos",
        },
        {
            icon: <BiHistory size={24} />,
            title: "History",
            url: "/history",
        },
        {
            icon: <HiOutlineVideoCamera size={24} />,
            title: "My Content",
            url: `/channel`,
        },
        {
            icon: <TbUserCheck size={24} />,
            title: "Subscriptions",
            url: "/subscriptions",
        },
    ];

    const bottomBarItems = [
        {
            icon: <RiHome6Line size={24} />,
            title: "Home",
            url: "/",
        },
        {
            icon: <BiHistory size={24} />,
            title: "History",
            url: "/history",
        },
        {
            icon: <HiOutlineVideoCamera size={24} />,
            title: "My Content",
            url: `/channel`,
        },
        {
            icon: <TbUserCheck size={24} />,
            title: "Subscriptions",
            url: "/subscriptions",
        },
    ];


    return (
        <>
            {/* for Large Screens */}
            <div className="sm:block hidden z-50 fixed" >
                <div className="text-white lg:w-60 md:w-44 w-16 sm:p-3 p-2 border-white border-r h-[calc(100vh-80px)] flex flex-col justify-between">
                    <div className='flex flex-col gap-2'>
                        {
                            sidebarTopItems.map((item) => (
                                <NavLink to={item.url} key={item.title} className={({isActive})=>(`${isActive ? 'bg-purple-500' : ''} border-[1px] border-white py-2 px-2 hover:bg-[#222222]`)}>
                                    <div className='flex gap-2'>
                                        {item.icon}
                                        <span className='hidden md:block'>{item.title}</span>
                                    </div>
                                </NavLink>
                            ))
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        {
                            authStatus && (
                                <div onClick={logout} className='border-[1px] border-white py-2 px-2 hover:bg-[#222222]'>
                                    <div className='flex gap-2 items-center'>
                                        <IoMdLogOut size={24} />
                                        <span className='hidden md:block'>Logout</span>
                                    </div>
                                </div>
                            )
                        }
                        <a href={'/'} className='border-[1px] border-white py-2 px-2 hover:bg-[#222222]'>
                            <div className='flex gap-2'>
                                <CiSettings size={24} />
                                <span className='hidden md:block'>Settings</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className='border-t-[1px]  text-white h-16 sm:hidden z-20 w-full flex justify-around fixed bottom-0 bg-[#0F0F0F] '>
                {
                    bottomBarItems.map((item) => (
                        <NavLink to={item.url} key={item.title} className={({isActive})=>(`${isActive ? 'text-purple-500' : ''} flex flex-col items-center gap-1 py-1 hover:scale-110`)}>
                            {item.icon}
                            <span className='text-sm'>
                                {item.title}
                            </span>
                        </NavLink>
                    ))
                }
            </div>
        </>
    )
}

export default Sidebar