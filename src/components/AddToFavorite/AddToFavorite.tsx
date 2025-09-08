"use client";

import styled from "@emotion/styled";
import { HeartIcon } from "@phosphor-icons/react";
import { useFavoritesStore } from "@store/useFavoritesStore";
import { flexRow, Icon, theme } from "@styles";

export interface AddToFavoriteProps {
	flowerId: string;
}

export const AddToFavorite: React.FC<AddToFavoriteProps> = ({ flowerId }) => {
	const { toggle, isFavorite } = useFavoritesStore();

	const active = isFavorite(flowerId);

	const handleClick = () => {
		toggle(flowerId);
	};

	return (
		<Wrapper onClick={handleClick}>
			<Icon color={active ? theme.colors.hotPink : theme.colors.dark}>
				<HeartIcon size={24} weight={active ? "fill" : "regular"} />
			</Icon>
		</Wrapper>
	);
};

const Wrapper = styled.button`
	all: unset;
	cursor: pointer;
	${flexRow("center", "center")};
	padding: 8px;
	position: absolute;
	right: 0;
	top: 0;
  transform: translate(40%, -40%);
	border-radius: 100px;
	background: ${theme.colors.white};
	width: 40px;
	height: 40px;
	transition:  background 0.2s ease;
	&:hover {
		background: rgba(255, 255, 255, 0.8);
	}
`;
