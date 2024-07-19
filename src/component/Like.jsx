import React, { useState } from 'react'
import { BiLike, BiDislike, BiSolidLike, BiLike as BiDislikeSolid } from './icons'; // Adjusted import for BiLike
import { useDispatch } from 'react-redux';
import { toggleCommentLike, toggleVideoLike } from '../store/Slices/likeSlice';

const Like = ({ videoId, commentId, isLiked, likesCount }) => {

    const [isLikedLocal, setIsLikedLocal] = useState(isLiked)
    const [likesCountLocal, setLikesCountLocal] = useState(likesCount)
    const dispatch = useDispatch()
    const handleLike = async () => {
        if (commentId) {
            setIsLikedLocal((prev) => !prev)
            setLikesCountLocal((prev) => {
                return isLikedLocal ? prev - 1 : prev + 1
            })
            await dispatch(toggleCommentLike(commentId));
        }
        if (videoId) {
            setIsLikedLocal((prev) => !prev)
            setLikesCountLocal((prev) => {
                return isLikedLocal ? prev - 1 : prev + 1
            })
            await dispatch(toggleVideoLike(videoId));
        }
    }
    return (
        <div className='flex gap-1 items-center'>
            <div onClick={handleLike}>
                {isLikedLocal ? <BiSolidLike /> : <BiLike />}
            </div>
            <span className='text-xs'>{likesCountLocal}</span>
            <BiDislike />
        </div>
    )
}

export default Like