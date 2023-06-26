'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axios, { AxiosError } from 'axios';
import clsx from 'clsx';
import FormField from '@/components/FormField';

interface FormFields {
	title: string;
}

const AddPost = () => {
	const MAX_CHARS = 300;

	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [form, setForm] = useState<FormFields>({
		title: '',
	});

	const queryClient = useQueryClient();

	// Create a new post
	const { mutate } = useMutation(
		async (title: string) => {
			const promiseToast = toast.promise(axios.post('/api/posts', { title }), {
				loading: 'Creating post...',
				success: 'Post created! 🔥',
				error: err => err?.response?.data.message,
			});

			return await promiseToast;
			// return await axios.post('/api/posts', {
			// 	title,
			// });
		},
		{
			onError: err => {
				// if (err instanceof AxiosError) {
				// 	toast.error(err?.response?.data.message);
				// }

				setIsDisabled(false);
			},
			onSuccess: data => {
				// toast.success('Post created! 🔥');

				queryClient.invalidateQueries(['posts']);
				setForm({ title: '' });
				setIsDisabled(false);
			},
		}
	);

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsDisabled(true);
		mutate(form.title);
	};

	return (
		<section className='max-w-7xl mx-auto'>
			<div>
				<h1 className='text-3xl font-extrabold text-slate-800'>Create</h1>
				<p className='mt-2 max-w-lg text-slate-700'>
					Start sharing your thoughts with the community!
				</p>
			</div>
			<form onSubmit={handleSubmit} className='mt-16 max-w-3xl'>
				<div className='flex flex-col gap-5'>
					<FormField
						name='title'
						placeholder="What's on your mind?"
						label='Title'
						value={form.title}
						handleChange={handleChange}
					/>
				</div>
				<div className='mt-4 flex items-center gap-4'>
					<p
						className={clsx(
							'font-semibold text-sm',
							form.title.length > MAX_CHARS && 'text-red-500'
						)}>
						{form.title.length} / {MAX_CHARS}
					</p>
					<button
						type='submit'
						disabled={isDisabled || form.title.length > MAX_CHARS}
						className='bg-indigo-500 text-slate-100 py-2 px-6 rounded-md text-sm font-medium disabled:opacity-25 hover:bg-indigo-700 transition duration-300 ease-in-out'>
						Create a Post
					</button>
				</div>
			</form>
		</section>
	);
};

export default AddPost;
