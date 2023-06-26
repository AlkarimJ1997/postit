'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AddPost from '@/components/AddPost';
import Post from '@/components/Post';
import { PostType } from '@/types';

const Home = () => {
	const { data, error, isLoading } = useQuery<PostType[]>({
		queryFn: async () => {
			const response = await axios.get('/api/posts');
			return response.data;
		},
		queryKey: ['posts'],
	});

	if (error) return error;
	if (isLoading) return 'Loading...';

	return (
		<>
			<AddPost />
			<main className='grid gap-y-8 mt-12'>
				{data?.map(post => (
					<Post
						key={post.id}
						id={post.id}
						title={post.title}
						name={post.user.name}
						avatar={post.user.image}
            comments={post.comments}
					/>
				))}
			</main>
		</>
	);
};

export default Home;
