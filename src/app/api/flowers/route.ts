import { NextResponse } from 'next/server';
import dbConnect from '@/lib/models/connection';
import Flower from '@/lib/models/Flower';

export async function GET(request: Request) {
	await dbConnect();

	try {
		const { searchParams } = new URL(request.url);
		const shopId = searchParams.get('shopId');
		const sort = searchParams.get('sort');
		const order = searchParams.get('order') || 'asc';
		const page = parseInt(searchParams.get('page') || '1');
		const limit = parseInt(searchParams.get('limit') || '8');

		let query = {};
		if (shopId) {
			query = { shopId };
		}

		let sortOption = {};
		if (sort === 'price') {
			sortOption = { price: order === 'asc' ? 1 : -1 };
		} else if (sort === 'name') {
			sortOption = { name: order === 'asc' ? 1 : -1 };
		} else {
			sortOption = { createdAt: -1 };
		}

		const skip = (page - 1) * limit;

		const flowers = await Flower.find(query).sort(sortOption).skip(skip).limit(limit);

		const total = await Flower.countDocuments(query);

		return NextResponse.json({
			flowers,
			pagination: {
				currentPage: page,
				totalPages: Math.ceil(total / limit),
				total,
				hasMore: page < Math.ceil(total / limit),
			},
		});
	} catch (error) {
		console.error('Error fetching flowers:', error);
		return NextResponse.json({ error: 'Failed to fetch flowers' }, { status: 500 });
	}
}
