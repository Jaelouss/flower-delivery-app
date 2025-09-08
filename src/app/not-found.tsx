"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
	const router = useRouter();

	return (
		<Container>
			<ImageWrapper>
				<picture>
					<source srcSet='/pictures/not-found/bg.webp' type='image/webp' />
					<Image
						src='/pictures/not-found/bg.png'
						alt='Page not found'
						fill
						style={{ objectFit: "contain" }}
						priority
					/>
				</picture>
			</ImageWrapper>

			<Subtitle>Oops! The flowers got lost...</Subtitle>
			<Description>
				The page you're looking for doesn't exist. Maybe the flowers ran away to
				another shop?
			</Description>

			<Button onClick={() => router.push("/")}>← Go Back Home</Button>

			<Footer>
				&copy; {new Date().getFullYear()} Flower Delivery App. All blooms with
				love.
			</Footer>
		</Container>
	);
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  text-align: center;
`;

const Subtitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 600;
  color: #374151;
  margin: 1rem 0;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  max-width: 32rem;
  font-size: 1.125rem;
  color: #6b7280;
  margin: 1.5rem 0;
  line-height: 1.6;

  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background-color: #ef4444;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #dc2626;
  }

  &:focus {
    outline: 2px solid #f87171;
    outline-offset: 2px;
  }
`;

const Footer = styled.footer`
  margin-top: 4rem;
  font-size: 0.875rem;
  color: #6b7280;
`;

const ImageWrapper = styled.div`
  width: 560px;
  height: 520px;
  position: relative;
`;
