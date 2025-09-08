"use client";

export interface OrderFormProps {
	children?: React.ReactNode;
}

export const OrderForm: React.FC<OrderFormProps> = ({ children }) => {
	return <section>{children}</section>;
};
