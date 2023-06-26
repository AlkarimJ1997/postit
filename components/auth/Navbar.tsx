import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';
import Link from 'next/link';
import Login from '@/components/auth/Login';
import Logged from '@/components/auth/Logged';

const Navbar = async () => {
	const session = await getServerSession(authOptions);

	return (
		<header className='min-h-nav flex items-center p-4 sm:px-8 justify-between border-b border-b-[#e6ebf4]'>
			<div className='flex items-center gap-3'>
				<Link href='/'>
					<h1 className='text-slate-900 text-xl font-medium'>Postit</h1>
				</Link>
				<Image
					src='/images/post.png'
					alt='Post'
					width={40}
					height={30}
					className='object-contain w-auto h-auto'
				/>
			</div>
			<ul role='list' className=''>
				{session?.user ? (
					<Logged
						name={session.user.name || ''}
						image={session.user.image || ''}
					/>
				) : (
					<Login />
				)}
			</ul>
		</header>
	);
};

export default Navbar;
