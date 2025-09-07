import styled from "@emotion/styled";
import { flexRow, theme } from "@styles";

interface CartBadgeProps {}

export const CartBadge: React.FC<CartBadgeProps> = () => {
	return <Badge>1</Badge>;
};

const Badge = styled.div`
	${flexRow("center", "center")}
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(20%, -10%);
	background: ${theme.colors.button};
	width: 16px;
	height: 16px;
	border-radius: 50%;
	color: ${theme.colors.bg};
	font-size: 10px;
`;
