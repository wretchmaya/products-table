import * as yup from 'yup';
export const validationSchema = yup.object({
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
