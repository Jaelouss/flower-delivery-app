import { NextResponse } from 'next/server';
import dbConnect from '@/lib/models/connection';
import Coupon from '@/lib/models/Coupon';

export async function GET() {
	await dbConnect();

	try {
		const now = new Date();
		const coupons = await Coupon.find({
			isActive: true,
		}).sort({ discount: -1 });

		return NextResponse.json(coupons);
	} catch (error) {
		console.error('Error fetching coupons:', error);
		return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 });
	}
}
