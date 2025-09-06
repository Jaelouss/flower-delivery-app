import { css } from '@emotion/react';

export type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
export type JustifyContent =
	| 'flex-start'
	| 'center'
	| 'flex-end'
	| 'space-between'
	| 'space-around'
	| 'space-evenly';

export const flexColumn = (
	align: AlignItems = 'flex-start',
	justify: JustifyContent = 'flex-start',
	gap = '8px'
) => css`
	display: flex;
	flex-direction: column;
	align-items: ${align};
	justify-content: ${justify};
	gap: ${gap};
`;

export const flexRow = (
	align: AlignItems = 'center',
	justify: JustifyContent = 'flex-start',
	gap = '8px'
) => css`
	display: flex;
	flex-direction: row;
	align-items: ${align};
	justify-content: ${justify};
	gap: ${gap};
`;
