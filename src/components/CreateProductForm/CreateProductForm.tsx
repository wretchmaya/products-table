import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, FormGroup, MenuItem, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createProductRequest } from '@/store/api';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/joy';
import { selectLoadingStatus } from '@/store/rootReducer';

const validationSchema = yup.object({
    title: yup.string().required('Title required'),
    description: yup.string().required('Description is required'),
    price: yup
        .number()
        .required('Price is required')
        .min(1),
    rating: yup.number().required('Rating is required'),
    stock: yup
        .number()
        .required('Stock is required')
        .min(1),
    category: yup.string().required('Category is required'),
});

export const CreateProductForm = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(selectLoadingStatus);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            title: '',
            description: 'default description',
            price: 1,
            rating: 1,
            stock: 1,
            category: 'default category',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            router.push('/');
            dispatch(createProductRequest(values));
        },
    });

    return (
        <div>
            {isLoading ? (
                <CircularProgress
                    sx={{
                        position: 'absolute',
                        top: '45%',
                        left: '48%',
                    }}
                />
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup
                        sx={{
                            padding: 2,
                            margin: '10% auto',
                            width: '40%',
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'primary.main',
                        }}
                    >
                        <TextField
                            fullWidth
                            id="title"
                            name="title"
                            label="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.description &&
                                Boolean(formik.errors.description)
                            }
                            helperText={
                                formik.touched.description && formik.errors.description
                            }
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="price"
                            name="price"
                            type="number"
                            label="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                            margin="normal"
                        />
                        <TextField
                            select
                            fullWidth
                            id="rating"
                            name="rating"
                            label="rating"
                            type="number"
                            value={formik.values.rating}
                            onChange={formik.handleChange}
                            error={formik.touched.rating && Boolean(formik.errors.rating)}
                            helperText={formik.touched.rating && formik.errors.rating}
                            margin="normal"
                        >
                            {Array.from(Array(10).keys()).map(number => (
                                <MenuItem key={number} value={number + 1}>
                                    {number + 1}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            id="stock"
                            name="stock"
                            label="stock"
                            type="number"
                            value={formik.values.stock}
                            onChange={formik.handleChange}
                            error={formik.touched.stock && Boolean(formik.errors.stock)}
                            helperText={formik.touched.stock && formik.errors.stock}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="category"
                            name="category"
                            label="category"
                            type="text"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.category && Boolean(formik.errors.category)
                            }
                            helperText={formik.touched.category && formik.errors.category}
                            margin="normal"
                        />
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            Submit
                        </Button>
                    </FormGroup>
                </form>
            )}
        </div>
    );
};
