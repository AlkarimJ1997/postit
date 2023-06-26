import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/libs/prisma';

interface Body {
	data: {
    title: string;
    id: string;
  }
}

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user || !session.user.email) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
	});

	if (!user) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { data: { title, id } } = (await request.json()) as Body;

		if (!title || !id) {
			return NextResponse.json({ message: 'Bad request' }, { status: 400 });
		}

		const result = await prisma.comment.create({
			data: {
				message: title,
				userId: user.id,
				postId: id,
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
