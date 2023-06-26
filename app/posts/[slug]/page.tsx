'use client';

import { useQuery } from '@tanstack/react-query';
import { PostType } from '@/types';
import Post from '@/components/Post';
import axios from 'axios';
import AddComment from '@/components/AddComment';
import Image from 'next/image';

interface PostDetailProps {
	params: {
		slug: string;
	};
}

const PostDetail = ({ params }: PostDetailProps) => {
	const { data, isLoading } = useQuery<PostType>({
		queryFn: async () => {
			const response = await axios.get(`/api/posts/${params.slug}`);

			return response.data;
		},
		queryKey: ['postDetail'],
	});

	if (isLoading || !data) return <p>Loading...</p>;

	return (
		<div>
			<Post
				id={data.id}
				title={data.title}
				name={data.user.name}
				avatar={data.user.image}
				comments={data.comments}
			/>
			<AddComment id={data.id} />
			{data.comments.map(comment => (
				<div
					key={comment.id}
					className='my-6 bg-gray-50 border border-gray-300 max-w-3xl p-8 rounded-md'>
					<div className='flex items-center gap-2'>
						<Image
							src={comment.user?.image || ''}
							alt={comment.user?.name || ''}
							width={30}
							height={30}
							className='rounded-full'
						/>
						<h3 className='font-semibold text-slate-900'>
							{comment.user?.name}
						</h3>
						<h2 className='text-sm text-gray-900'>{comment.createdAt}</h2>
					</div>
					<div className='mt-6'>{comment.message}</div>
				</div>
			))}
		</div>
	);
};

export default PostDetail;
