
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from './rootReducer';

export const fetchProductsRequest = createAsyncThunk(
	'products/fetchProducts',
	async () => {
		const response = await axios.get('https://dummyjson.com/products?limit=11');
		return response.data.products.map((item: Product) => ({
			image: item.thumbnail,
			id: item.id,
			title: item.title,
			description: item.description,
			price: item.price,
			rating: item.rating,
			stock: item.stock,
			category: item.category,
		}))
	}
);

export const deleteProductRequest = createAsyncThunk(
	'products/deleteProduct',
	async (ids: Array<number>) => {
		const promises = ids.map(async (id: number) => {
			return await axios.delete(`https://dummyjson.com/products/${id}`);
		})
		const results = await Promise.all(promises);
		return results.map(prop => prop.data.id);
	}
);

export const createProductRequest = createAsyncThunk(
	'products/createProduct',
	async (newProduct: object) => {
		const { data } = await axios.post('https://dummyjson.com/products/add', newProduct)
		return {
			image: '',
			id: data.id,
			title: data.title,
			description: data.description,
			price: data.price,
			rating: data.rating,
			stock: data.stock,
			category: data.category,
		}
	}
);

export const getProductById = createAsyncThunk(
	'products/getProductById',
	async (id: string | undefined | string[]) => {
		const { data } = await axios.get(`https://dummyjson.com/products/${id}`)
		return data
		// return {
		// 	image: '',
		// 	id: data.id,
		// 	title: data.title,
		// 	description: data.description,
		// 	price: data.price,
		// 	rating: data.rating,
		// 	stock: data.stock,
		// 	category: data.category,
		// }
	}
);
