import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/libs/prisma';

interface Params {
	params: {
		id: string;
	};
}

export async function GET(request: NextRequest, { params }: Params) {
	try {
		const data = await prisma.post.findUnique({
			where: { id: params.id },
			include: {
				user: true,
				comments: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						user: true,
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

export async function DELETE(request: NextRequest, { params }: Params) {
	const session = await getServerSession(authOptions);

	if (!session || !session.user || !session.user.email) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	if (!params.id) {
		return NextResponse.json({ message: 'Bad request' }, { status: 400 });
	}

	try {
		const result = await prisma.post.delete({
			where: { id: params.id },
		});

		return NextResponse.json(result, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 }
		);
	}
}
