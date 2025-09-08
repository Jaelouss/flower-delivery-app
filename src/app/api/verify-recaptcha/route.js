import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const { token } = await request.json();

		if (!token) {
			return NextResponse.json(
				{ success: false, error: "No reCAPTCHA token provided" },
				{ status: 400 },
			);
		}

		const secretKey = process.env.RECAPTCHA_SECRET_KEY;

		if (!secretKey) {
			console.error("RECAPTCHA_SECRET_KEY not configured");
			return NextResponse.json(
				{ success: false, error: "Server configuration error" },
				{ status: 500 },
			);
		}

		const verificationResponse = await fetch(
			"https://www.google.com/recaptcha/api/siteverify",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: `secret=${secretKey}&response=${token}`,
			},
		);

		const verificationResult = await verificationResponse.json();

		if (verificationResult.success) {
			if (verificationResult.score && verificationResult.score < 0.5) {
				return NextResponse.json({
					success: false,
					error: "Low confidence score",
				});
			}

			return NextResponse.json({
				success: true,
				score: verificationResult.score,
			});
		} else {
			return NextResponse.json({
				success: false,
				error: "reCAPTCHA verification failed",
				details: verificationResult["error-codes"],
			});
		}
	} catch (error) {
		console.error("reCAPTCHA verification error:", error);
		return NextResponse.json(
			{ success: false, error: "Internal server error" },
			{ status: 500 },
		);
	}
}
