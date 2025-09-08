import { NextResponse } from "next/server";
import Coupon from "@/lib/models/Coupon";
import dbConnect from "@/lib/models/connection";

interface Params {
	code: string;
}

export async function GET({ params }: { params: Params }) {
	await dbConnect();

	const { code } = await params;

	try {
		const coupon = await Coupon.findOne({ code, isActive: true });

		if (!coupon) {
			return NextResponse.json({ error: "Invalid coupon" }, { status: 404 });
		}

		return NextResponse.json(coupon);
	} catch (error) {
		console.error("Error checking coupon:", error);
		return NextResponse.json(
			{ error: "Failed to check coupon" },
			{ status: 500 },
		);
	}
}
