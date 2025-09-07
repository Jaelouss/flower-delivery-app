"use client";

import { FlowerLoader } from "@UI";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { flexRow } from "@styles";
import { useIsFetching } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const GlobalQueryLoader = () => {
	const isFetching = useIsFetching();
	const [isVisible, setIsVisible] = useState(false);
	const [isExiting, setIsExiting] = useState(false);

	useEffect(() => {
		if (isFetching > 0) {
			setIsExiting(false);
			setIsVisible(true);
		} else if (isVisible) {
			setIsExiting(true);
			const timer = setTimeout(() => {
				setIsVisible(false);
			}, 200);

			return () => clearTimeout(timer);
		}
	}, [isFetching, isVisible]);

	if (!isVisible) return null;

	return (
		<Wrapper className={isExiting ? "exiting" : ""}>
			<FlowerLoader />
		</Wrapper>
	);
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.96);
  }
`;

const Wrapper = styled.div`
  ${flexRow("center", "center")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999
  background: rgba(254, 244, 255, 0.68);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);
  animation: ${fadeIn} 0.26s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  &.exiting {
    animation: ${fadeOut} 0.2s ease-out forwards;
  }
`;
