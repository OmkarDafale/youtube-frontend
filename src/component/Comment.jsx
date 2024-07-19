import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getVideoComments } from '../store/Slices/commentSlice';
import { timeAgo } from '../helper/timeAgo';
import Loader from './Loader';
import Button from './Button';
import { useForm } from 'react-hook-form';
import Like from './Like';

const Comment = ({ videoId }) => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comment?.comments);
    const totalComments = useSelector((state) => state.comment?.totalComments);
    const loading = useSelector((state) => state.comment?.loading);
    const { register, handleSubmit, reset } = useForm(); // Reset function from useForm

    const [newComment, setNewComment] = useState(false)

    const submit = async (data) => {
        setNewComment(true)
        await dispatch(addComment({ videoId, content: data.content }));
        setNewComment(false)
        reset(); // Reset the form after successful submission
    };

    useEffect(() => {
        if (videoId) {
            dispatch(getVideoComments(videoId));
        }
    }, [videoId,newComment]);

    return (
        <div className='sm:h-[68vh] sm:max-w-4xl w-full flex flex-col px-5 gap-2 text-white'>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <h1>{totalComments} Comments</h1>
                    <form
                        className="flex py-2"
                        onSubmit={handleSubmit(submit)}
                    >
                        <textarea
                            placeholder="Type your comment..."
                            className="w-full bg-transparent border-[1px] px-2 rounded-s-md border-slate-400"
                            {...register('content', { required: 'Comment must be present' })}
                        />
                        <Button type="submit" className='bg-purple-500 px-2 rounded-e-md'>Comment</Button>
                    </form>
                    {comments.map((comment) => (
                        <div key={comment._id} className='flex gap-2 items-center border-b-[1px] border-slate-400 py-2'>
                            <img src={comment.owner.avatar.url} alt="" className='w-10 h-10 rounded-full' />
                            <div className='flex flex-col gap-[1px]'>
                                <p className='text-sm'>{comment.owner.username} <span className='text-slate-400 text-xs'>{timeAgo(comment.createdAt)}</span></p>
                                <p>{comment.content}</p>
                                <Like commentId={comment._id}
                                    isLiked={comment.isLiked}
                                    likesCount={comment.likesCount}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;
