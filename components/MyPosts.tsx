'use client';

import { useQuery } from '@tanstack/react-query';
import { UserPost } from '@/types';
import axios from 'axios';
import EditPost from '@/components/EditPost';

const MyPosts = () => {
	const { data, error, isLoading } = useQuery<UserPost>({
		queryFn: async () => {
			const response = await axios.get('/api/posts/user');
			return response.data;
		},
		queryKey: ['userPosts'],
	});

	if (error) return <p>There was an error loading your posts</p>;
	if (isLoading) return <p>Posts are loading...</p>;

	console.log(data);

	return (
		<main className='grid gap-y-8 mt-8'>
			{data?.posts.map(post => (
				<EditPost
					key={post.id}
					id={post.id}
					name={data.name}
					title={post.title}
					avatar={data.image}
					comments={post.comments}
				/>
			))}
		</main>
	);
};

export default MyPosts;
