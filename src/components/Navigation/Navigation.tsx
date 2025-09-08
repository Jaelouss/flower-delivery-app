"use client";
import { NavLink } from "@styles";
import { usePathname } from "next/navigation";

export interface NavigationProps {}

export const Navigation: React.FC<NavigationProps> = () => {
	const pathname = usePathname();

	const navItems = [
		{ label: "Main", href: "/" },
		{ label: "Shop", href: "/shop" },
		{ label: "History", href: "/order" },
		{ label: "Coupons", href: "/coupons" },
	];

	return (
		<nav>
			{navItems.map((item) => (
				<NavLink
					key={item.href}
					href={item.href}
					$isActive={pathname === item.href}
				>
					{item.label}
				</NavLink>
			))}
		</nav>
	);
};
