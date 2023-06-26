import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/libs/prisma';

interface Body {
	title: string;
}

export async function GET() {
	try {
		const data = await prisma.post.findMany({
			include: {
				user: true,
				comments: true,
			},
			orderBy: {
				createdAt: 'desc',
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

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user || !session.user.email) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	const { title } = (await request.json()) as Body;

	if (!title) {
		return NextResponse.json({ message: 'Bad request' }, { status: 400 });
	}

	if (title.length > 300) {
		return NextResponse.json(
			{ message: 'Post body too long' },
			{ status: 400 }
		);
	}

	try {
		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		if (!user) {
			return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
		}

		const result = await prisma.post.create({
			data: {
				title,
				userId: user.id,
			},
		});

		return NextResponse.json(result, { status: 201 });
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
}
