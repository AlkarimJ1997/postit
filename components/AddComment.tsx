'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import clsx from 'clsx';

interface AddCommentProps {
	id: string;
}

const AddComment = ({ id }: AddCommentProps) => {
	const MAX_CHARS = 300;

	const [title, setTitle] = useState<string>('');
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const queryClient = useQueryClient();

	const { mutate } = useMutation(
		async (data: { title: string; id: string }) => {
			const promiseToast = toast.promise(
				axios.post('/api/posts/comments', { data }),
				{
					loading: 'Adding comment...',
					success: 'Comment added! 👍',
					error: err => err?.response?.data.message,
				}
			);

			return await promiseToast;
		},
		{
			onError: err => setIsDisabled(false),
			onSuccess: data => {
				setTitle('');
				setIsDisabled(false);
				queryClient.invalidateQueries(['postDetail']);
			},
		}
	);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsDisabled(true);
		mutate({ title, id });
	};

	return (
		<form onSubmit={handleSubmit} className='my-8'>
			<h3>Add a Comment</h3>
			<div className='flex flex-col my-2'>
				<input
					required
					type='text'
					name='title'
					placeholder='Comment'
					value={title}
					onChange={e => setTitle(e.target.value)}
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:ring-2 focus:border-indigo-500 outline-none block w-full p-3 max-w-3xl'
				/>
			</div>
			<div className='flex items-center gap-3 mt-4'>
				<p
					className={clsx(
						'font-semibold text-sm',
						title.length > MAX_CHARS && 'text-red-500'
					)}>
					{title.length} / {MAX_CHARS}
				</p>
				<button
					disabled={isDisabled}
					type='submit'
					className='bg-indigo-500 text-slate-100 px-4 py-2 rounded-lg'>
					Add Comment 🚀
				</button>
			</div>
		</form>
	);
};

export default AddComment;
