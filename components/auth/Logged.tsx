'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

interface LoggedProps {
	name: string;
	image: string;
}

const Logged = ({ name, image }: LoggedProps) => {
	return (
		<li className='flex gap-8 items-center'>
			<button
				onClick={() => signOut()}
				className='bg-slate-700 text-slate-100 py-2 px-6 rounded-md disabled:opacity-25'>
				Sign Out
			</button>
			<Link href='/dashboard'>
				{image && (
					<Image
						src={image}
						alt={name}
						width={56}
						height={56}
						className='rounded-full'
					/>
				)}
			</Link>
		</li>
	);
};

export default Logged;
