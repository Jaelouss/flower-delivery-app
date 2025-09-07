import styled from '@emotion/styled';
import { AlignItems, JustifyContent } from '../mixins';
import { relative } from 'path';

interface BoxProps {
	column?: boolean;
	row?: boolean;
	align?: AlignItems;
	justify?: JustifyContent;
	gap?: string;
	width?: string;
	border?: string;
	borderRadius?: string;
	padding?: string;
	margin?: string;
	zIndex?: string;
	position?:string;
	top?: string;
  right?: string;
  bottom?: string;
  left?: string;
	maxWidth?:string;
	children?: React.ReactNode;
}

export const Box = styled.div<BoxProps>`
	display: flex;
	flex-direction: ${({ column }) => (column ? 'column' : 'row')};
	align-items: ${({ align }) => align || 'center'};
	justify-content: ${({ justify }) => justify || 'center'};
	gap: ${({ gap }) => gap || '0'};
	width: ${({ width }) => width || '100%'};
	max-width: ${({ maxWidth }) => maxWidth || 'unset'};
	border: ${({ border }) => border || 'none'};
	border-radius: ${({ borderRadius }) => borderRadius || '0'};
	padding: ${({ padding }) => padding || '0'};
	margin: ${({ margin }) => margin || '0'};
	position: ${({ zIndex,position }) => ( position ? position : zIndex ? 'relative' :'static')};
	z-index: ${({ zIndex }) => zIndex || 'auto'};
	top: ${({ top }) => top || 'auto'};
	right: ${({ right }) => right || 'auto'};
	bottom: ${({ bottom }) => bottom || 'auto'};
	left: ${({ left }) => left || 'auto'};
`;
