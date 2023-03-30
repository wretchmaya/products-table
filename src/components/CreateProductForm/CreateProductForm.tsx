import React from 'react';
import { useFormik } from 'formik';
import { Button, MenuItem, TextField, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createProductRequest } from '@/store/api';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/joy';
import { selectLoadingStatus } from '@/store/rootReducer';
import { validationSchema } from './validationSchema';
import { CLASSES, LABELS, TEXT } from './constants';
import { ROUTES } from '@/constants/routes';

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
            router.push(ROUTES.DEFAULT);
            dispatch(createProductRequest(values));
        },
    });

    return (
        <div>
            {isLoading ? (
                <CircularProgress className={CLASSES.SPINNER} />
            ) : (
                <form onSubmit={formik.handleSubmit} className={CLASSES.FORM_UI}>
                    <Box component="div" className={CLASSES.FORM_FIELDS_WRAPPER}>
                        <TextField
                            fullWidth
                            label={LABELS.TITLE}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                            margin="normal"
                            {...formik.getFieldProps(LABELS.TITLE)}
                        />
                        <TextField
                            fullWidth
                            label={LABELS.DESCRIPTION}
                            error={
                                formik.touched.description &&
                                Boolean(formik.errors.description)
                            }
                            helperText={
                                formik.touched.description && formik.errors.description
                            }
                            margin="normal"
                            {...formik.getFieldProps(LABELS.DESCRIPTION)}
                        />
                        <TextField
                            fullWidth
                            type="number"
                            label={LABELS.PRICE}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                            margin="normal"
                            {...formik.getFieldProps(LABELS.PRICE)}
                        />
                        <TextField
                            select
                            fullWidth
                            label={LABELS.RATING}
                            type="number"
                            error={formik.touched.rating && Boolean(formik.errors.rating)}
                            helperText={formik.touched.rating && formik.errors.rating}
                            margin="normal"
                            {...formik.getFieldProps(LABELS.RATING)}
                        >
                            {Array.from(Array(10).keys()).map(number => (
                                <MenuItem key={number} value={number + 1}>
                                    {number + 1}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            fullWidth
                            label={LABELS.STOCK}
                            type="number"
                            error={formik.touched.stock && Boolean(formik.errors.stock)}
                            helperText={formik.touched.stock && formik.errors.stock}
                            margin="normal"
                            {...formik.getFieldProps(LABELS.STOCK)}
                        />
                        <TextField
                            fullWidth
                            label={LABELS.CATEGORY}
                            type="text"
                            error={
                                formik.touched.category && Boolean(formik.errors.category)
                            }
                            helperText={formik.touched.category && formik.errors.category}
                            margin="normal"
                            {...formik.getFieldProps(LABELS.CATEGORY)}
                        />
                        <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            {TEXT.CREATE}
                        </Button>
                    </Box>
                </form>
            )}
        </div>
    );
};
