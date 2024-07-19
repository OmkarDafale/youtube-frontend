import React from 'react'
import { Input, Logo, Button } from './index.js'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createAccount, userLogin } from '../store/Slices/authSlice.js'

const SignInPage = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submit = async (data) => {
        const response = await dispatch(createAccount(data))
        if (response?.payload?.success) {
            const username = data?.username
            const password = data?.password
            const loginResult = await dispatch(userLogin({ username, password }))

            if (loginResult?.type === 'login/fulfilled') {
                navigate('/')
            }
            else {
                navigate('/login')
            }
        }
    }
    return (
        <div className='w-full h-screen flex justify-center items-center py-10'>
            <div className='border-[1px] border-white px-5 py-5 flex flex-col items-center'>
                <Logo />
                <form className='space-y-2' onSubmit={handleSubmit(submit)}>
                    <Input label='Avatar:' type='file' control={control} {...register('avatar')} />
                    <Input label='Cover Image:' type='file' control={control} {...register('coverImage')} />
                    <Input label='Username:' placeholder='Enter username' {...register('username', { required: "Username is required" })} />
                    {errors.username && (
                        <span className="text-red-500">
                            {errors.username.message}
                        </span>
                    )}
                    <Input label='Email:' placeholder='enter email' {...register('email', { required: "Email is required" })} />
                    {errors.username && (
                        <span className="text-red-500">
                            {errors.email.message}
                        </span>
                    )}
                    <Input label='Full Name:' placeholder='enter fullName' {...register('fullName', { required: "Full Name is required" })} />
                    {errors.username && (
                        <span className="text-red-500">
                            {errors.fullName.message}
                        </span>
                    )}
                    <Input label='Password :' type='password' placeholder='Enter Password' {...register('password', { required: 'Password is required' })} />
                    {errors.password && (
                        <span className='text-red-500'>{errors.password.message}</span>
                    )}
                    <Button
                        className='border-[1px] border-white w-full px-2 py-2 hover:bg-[#222222]'
                    >
                        Sign In
                    </Button>
                    <p className='text-white text-sm'>
                        Already have an account ?
                        <span><Link to="/login" className='text-green-500'> Login </Link></span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignInPage