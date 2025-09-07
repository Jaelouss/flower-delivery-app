import { Footer, Header } from "@components";
import type { Metadata } from "next";
import { kodchasan } from "./fonts";
import { Providers } from "./Providers";

export const metadata: Metadata = {
	title: "Flower Delivery",
	description: "Order flowers online",
	icons: {
		icon: [
			{ url: "/favicon/favicon.svg", type: "image/svg+xml" },
			{ url: "/favicon/favicon.ico" },
			{ url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{ url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
		],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={kodchasan.className}>
			<body>
				<Providers>
					<Header />
					<main>{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
