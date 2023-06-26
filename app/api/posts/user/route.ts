import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/libs/prisma';

export async function GET() {
	const session = await getServerSession(authOptions);

	if (!session || !session.user || !session.user.email) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	// Get user's posts from the DB
	try {
		const data = await prisma.user.findUnique({
			where: { email: session.user.email },
			include: {
				posts: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						comments: true,
					},
				},
			},
		});

		return NextResponse.json(data, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
}
