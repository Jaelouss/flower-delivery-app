"use client";

import styled from "@emotion/styled";
import Caret from "@icons/CaretUp.svg";
import { flexRow, Icon, theme } from "@styles";
export interface SortOrderButtonProps {
	sortType: string;
	changeSortOrder: (order: "asc" | "desc" | null) => void;
	sortOrder: "asc" | "desc" | null;
}

export const SortOrderButton: React.FC<SortOrderButtonProps> = ({
	sortType,
	changeSortOrder,
	sortOrder,
}) => {
	const handleClick = () => {
		const next = sortOrder === "asc" ? "desc" : "asc";
		changeSortOrder(next);
	};

	return (
		<SortButton onClick={handleClick}>
			<SortBy>{sortType}</SortBy>
			<Icon
				$size={[24, 24]}
				style={{
					transform:
						sortOrder === "asc"
							? "rotate(180deg)"
							: sortOrder === "desc"
								? "rotate(0deg)"
								: "rotate(270deg)",
					transition: "transform 0.3s",
				}}
			>
				<Caret />
			</Icon>
		</SortButton>
	);
};
const SortButton = styled.button`
${flexRow("center", "space-between")}
padding: 12px 16px 12px 20px;
border-radius: ${theme.border.radius};
border:${theme.border.gray};
background: ${theme.colors.bg};
`;
const SortBy = styled.span`
color: #000;
font-size: 16px;
font-weight: 400;
`;
