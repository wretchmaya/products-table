import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { fetchProductsRequest, deleteProductRequest, createProductRequest } from './api';

export interface Product {
	id: number,
	title: string,
	description: string,
	price: number,
	discountPercentage?: number,
	rating: number,
	stock: number,
	brand?: string,
	category: string,
	thumbnail?: string,
	image?: string
};

export interface Products {
	products: Product[];
	isLoading: boolean;
};

const initialState: Products = {
	products: [],
	isLoading: false,
};

export const productsSlice = createSlice({
	name: 'productsSlice',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProductsRequest.pending, (state, action) => {
			state.isLoading = true;
		})
		builder.addCase(fetchProductsRequest.fulfilled, (state, action) => {
			state.products = [...action.payload];
			state.isLoading = false;
		})
		builder.addCase(deleteProductRequest.pending, (state, action) => {
			state.isLoading = true;
		})
		builder.addCase(deleteProductRequest.fulfilled, (state, action) => {
			const newProductsList = state.products.filter(product =>
				action.payload.every(id => product.id !== id));
			state.products = [...newProductsList];
			state.isLoading = false;
		})
		builder.addCase(createProductRequest.pending, (state, action) => {
			state.isLoading = true;
		})
		builder.addCase(createProductRequest.fulfilled, (state, action) => {
			state.products = [...state.products, action.payload]
			state.isLoading = false;
		})
	},
});


export const selectProducts = (state: RootState) => state.products;
export const selectLoadingStatus = (state: RootState) => state.products.isLoading;

export default productsSlice.reducer;
