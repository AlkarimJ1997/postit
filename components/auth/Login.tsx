'use client';

import { signIn } from 'next-auth/react';

const Login = () => {
	return (
		<li className=''>
			<button
				onClick={() => signIn()}
				className='bg-slate-700 text-slate-100 py-2 px-6 rounded-md disabled:opacity-25'>
				Sign In
			</button>
		</li>
	);
};

export default Login;
