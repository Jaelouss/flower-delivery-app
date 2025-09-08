import { Handlee, Inter, Kodchasan } from "next/font/google";

export const kodchasan = Kodchasan({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	display: "swap",
});

export const handlee = Handlee({
	subsets: ["latin"],
	weight: "400",
	display: "swap",
});

export const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
});
