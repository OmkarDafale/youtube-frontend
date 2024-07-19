import React from 'react'
import { Button, Input, Logo } from './index.js'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { userLogin, getCurrentUser } from '../store/Slices/authSlice.js'
import { Link, useNavigate } from 'react-router-dom'
const LoginPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.auth?.userData)

    const submit = async (data) => {
        const isEmail = data.username.includes('@')
        const loginData = isEmail ? {
            email: data.username, password: data.password
        } :
            data

        const reponse = await dispatch(userLogin(loginData))
        const user = await dispatch(getCurrentUser())
        if (user && reponse?.payload) {
            navigate('/')
        }
    }

    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className='border-[1px] border-white px-5 py-5 flex flex-col items-center gap-5'>
                <Logo />
                <form className='space-y-5' onSubmit={handleSubmit(submit)}>
                    <Input label='Username/Email :' placeholder='example@gmail.com' {...register('username', { required: "Username is required" })} />
                    {errors.username && (
                        <span className="text-red-500">
                            {errors.username.message}
                        </span>
                    )}
                    <Input label='Password :' type='password' placeholder='1kd074fjw0' {...register('password', { required: 'Password is required' })} />
                    {errors.password && (
                        <span className='text-red-500'>{errors.password.message}</span>
                    )}
                    <Button
                        className='border-[1px] border-white w-full px-2 py-2 hover:bg-[#222222]'
                    >
                        Login
                    </Button>
                    <p className='text-white text-sm'>
                        Don't have an account ?
                        <span><Link to="/signup" className='text-green-500'> Sign up </Link></span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage