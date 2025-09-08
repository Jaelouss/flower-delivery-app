import { Suspense } from "react";
import ClientPage from "./ClientPage";

export default function ShopPage() {
	return (
		<Suspense fallback={<div>Loading shop...</div>}>
			<ClientPage />
		</Suspense>
	);
}
