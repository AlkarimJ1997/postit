'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Comment } from '@/types';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import Toggle from '@/components/Toggle';

interface EditPostProps {
	id: string;
	name: string;
	title: string;
	avatar: string;
	comments: Comment[];
}

const EditPost = ({ id, name, title, avatar, comments }: EditPostProps) => {
	const [toggle, setToggle] = useState<boolean>(false);
	const queryClient = useQueryClient();

	const { mutate } = useMutation(
		async (id: string) => await axios.delete(`/api/posts/${id}`),
		{
			onError: err => {
				if (err instanceof AxiosError) {
					console.log(err?.response?.data.message);
				}

				setToggle(false);
			},
			onSuccess: data => {
				queryClient.invalidateQueries(['userPosts']);
				setToggle(false);
			},
		}
	);

	const handleDelete = () => mutate(id);

	return (
		<>
			<article className='rounded-lg border border-indigo-200 ring-2 ring-indigo-200 bg-gray-100 p-4 max-w-3xl'>
				<div className='flex items-center gap-2'>
					<Image
						src={avatar}
						alt='Avatar'
						width={32}
						height={32}
						className='rounded-full'
					/>
					<h3 className='font-semibold text-gray-700'>{name}</h3>
				</div>
				<div className='my-8'>
					<p className='break-all text-gray-700'>{title}</p>
				</div>
				<div className='flex gap-4 items-center'>
					<p className='text-sm font-bold text-gray-700'>
						{comments.length} Comments
					</p>
					<button
						onClick={() => setToggle(true)}
						className='text-sm rounded-md px-6 py-2 bg-red-500 text-slate-100'>
						Delete
					</button>
				</div>
			</article>
			{toggle && <Toggle deletePost={handleDelete} setToggle={setToggle} />}
		</>
	);
};

export default EditPost;
