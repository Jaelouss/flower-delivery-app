"use client";

import { CartBadge } from "@UI";
import CartIcon from "@icons/CartIcon.svg";
import { Box, Icon, NavLink, theme } from "@styles";
import { usePathname } from "next/navigation";
export interface CartProps {}

export const Cart: React.FC<CartProps> = () => {
	const pathname = usePathname();

	const navItem = { label: "Cart", href: "/cart" };
	return (
		<NavLink
			key={navItem.href}
			href={navItem.href}
			$isActive={pathname === navItem.href}
		>
			<Box cursor='pointer' gap='6px'>
				{navItem.label}
				<Icon
					$size={[42, 42]}
					color={
						pathname === navItem.href
							? theme.colors.greenAccent
							: theme.colors.dark
					}
					position='relative'
				>
					<CartIcon />
					<CartBadge />
				</Icon>
			</Box>
		</NavLink>
	);
};
