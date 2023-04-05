import { EnhencedTable } from "@/components/Table/EnhancedTable";
import { fetchProductsRequest } from "@/store/api";
import { store } from "@/store/store";
// export async function getStaticProps() {
// 	// await store.dispatch(fetchProductsRequest());
// 	store.getState().products.products.length === 0 ? await store.dispatch(fetchProductsRequest()) : null;
// 	const products = store.getState().products.products;
// 	console.log(products)

// 	return {
// 		props: {
// 			products,
// 		},
// 	};
// }
export default EnhencedTable;