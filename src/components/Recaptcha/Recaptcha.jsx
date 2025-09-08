"use client";

import styled from "@emotion/styled";
import { useCallback, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export const RecaptchaField = ({ onChange }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [value, setValue] = useState(null);
	const recaptchaRef = useRef(null);

	const handleChange = useCallback(
		(val) => {
			setValue(val);
			onChange(val);
		},
		[onChange],
	);

	const handleExpire = useCallback(() => {
		setValue(null);
		onChange(null);
	}, [onChange]);

	const handleError = useCallback(() => {
		setValue(null);
		onChange(null);
	}, [onChange]);

	return (
		<Container>
			<ReCAPTCHA
				ref={recaptchaRef}
				sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
				onChange={handleChange}
				onExpired={handleExpire}
				onError={handleError}
				onLoad={() => setIsLoaded(true)}
			/>
			{!value && isLoaded && (
				<ErrorMsg>Please confirm that you're not a robot</ErrorMsg>
			)}
		</Container>
	);
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const ErrorMsg = styled.span`
  color: #dc2626;
  font-size: 14px;
`;
