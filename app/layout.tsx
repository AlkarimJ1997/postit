import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/auth/Navbar';
import QueryWrapper from '@/components/QueryWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Postit.',
	description: 'A simple, post-it blog app for developers.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<QueryWrapper>
					<Navbar />
					<Toaster />
					<main className='px-4 py-8 sm:p-8 bg-[#f9fafe] min-h-main'>
						{children}
					</main>
				</QueryWrapper>
			</body>
		</html>
	);
}
