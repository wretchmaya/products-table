import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import {
    fetchProductsRequest,
    deleteProductRequest,
    createProductRequest,
    getProductByIdRequest,
    getProductReviewsByIdRequest,
} from './api';

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage?: number;
    rating: number;
    stock: number;
    brand?: string;
    category: string;
    thumbnail?: string;
    image?: string;
    images?: string[];
}
interface Products {
    products: Product[];
    isLoading: boolean;
    currentProduct: Product;
    currentProductReviews: [];
}

const initialState: Products = {
    products: [],
    isLoading: false,
    currentProduct: {
        id: 0,
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        image: '',
        images: [],
    },
    currentProductReviews: [],
};

export const productsSlice = createSlice({
    name: 'productsSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchProductsRequest.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProductsRequest.fulfilled, (state, action) => {
            state.products = [...action.payload];
            state.isLoading = false;
        });
        builder.addCase(deleteProductRequest.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(deleteProductRequest.fulfilled, (state, action) => {
            const newProductsList = state.products.filter(product =>
                action.payload.every(id => product.id !== id)
            );
            state.products = [...newProductsList];
            state.isLoading = false;
        });
        builder.addCase(createProductRequest.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(createProductRequest.fulfilled, (state, action) => {
            state.products = [...state.products, action.payload];
            state.isLoading = false;
        });
        builder.addCase(getProductByIdRequest.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getProductByIdRequest.fulfilled, (state, action) => {
            state.currentProduct = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getProductReviewsByIdRequest.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getProductReviewsByIdRequest.fulfilled, (state, action) => {
            state.currentProductReviews = action.payload;
            state.isLoading = false;
        });
    },
});

export const selectProducts = (state: RootState) => state.products;
export const selectLoadingStatus = (state: RootState) => state.products.isLoading;
export const selectCurrentProduct = (state: RootState) => state.products.currentProduct;
export const selectCurrentProductReviews = (state: RootState) =>
    state.products.currentProductReviews;

export default productsSlice.reducer;
