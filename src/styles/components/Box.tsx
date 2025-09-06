import styled from '@emotion/styled';
import { AlignItems, JustifyContent } from '../mixins';

interface BoxProps {
	column?: boolean;
	row?: boolean;
	align?: AlignItems;
	justify?: JustifyContent;
	gap?: string;
	width?: string;
	children?: React.ReactNode;
}

export const Box = styled.div<BoxProps>`
	display: flex;
	width: ${({ width }) => width || '100%'};
	flex-direction: ${({ column }) => (column ? 'column' : 'row')};
	align-items: ${({ align }) => align || 'center'};
	justify-content: ${({ justify }) => justify || 'center'};
	gap: ${({ gap }) => gap || ''};
`;
