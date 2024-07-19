import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Input';
import { useDispatch } from 'react-redux';
import { getAllVideos } from '../../store/Slices/videoSlice';


const Search = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const search = (query) => {
        dispatch(getAllVideos(query))
    }

    return (
        <form onSubmit={handleSubmit(search)}>
            <Input placeholder='Search'
                {...register('query', { required: true })}
            />
        </form>
    )
}

export default Search

