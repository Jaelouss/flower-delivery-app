'use client';

import { Box, Icon, NavLink, theme } from '@styles';
import { usePathname } from 'next/navigation';
import CartIcon from '@icons/CartIcon.svg';
import { CartBadge } from '@UI';
export interface CartProps {}

export const Cart: React.FC<CartProps> = () => {
	const pathname = usePathname();

	const navItem = { label: 'Cart', href: '/cart' };
	return (
		<NavLink key={navItem.href} href={navItem.href} $isActive={pathname === navItem.href}>
			<Box gap='6px'>
				{navItem.label}
				<Icon
					color={pathname === navItem.href ? theme.colors.greenAccent : theme.colors.dark}
					position='relative'>
					<CartIcon />
					<CartBadge />
				</Icon>
			</Box>
		</NavLink>
	);
};
