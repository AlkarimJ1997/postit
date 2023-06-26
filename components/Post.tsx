import { Comment } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface PostProps {
	id: string;
	title: string;
	name: string;
	avatar: string;
	comments: Comment[];
}

const Post = ({ id, title, name, avatar, comments }: PostProps) => {
	return (
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
			<div className='flex gap-4 cursor-pointer items-center'>
				<Link href={`/posts/${id}`} className='text-sm font-bold text-gray-700'>
					{comments.length} Comments
				</Link>
			</div>
		</article>
	);
};

export default Post;
