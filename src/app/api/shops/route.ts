import { NextResponse } from 'next/server';
import dbConnect from '@/lib/models/connection';
import Shop from '@/lib/models/Shop';

export async function GET() {
	await dbConnect();

	try {
		const shops = await Shop.find({});
		return NextResponse.json(shops);
	} catch (error) {
		console.error('Error fetching shops:', error);
		return NextResponse.json({ error: 'Failed to fetch shops' }, { status: 500 });
	}
}
