import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useEffect } from 'react';
import { getProductByIdRequest } from '@/store/api';
import { useRouter } from 'next/router';
import { selectCurrentProduct, selectLoadingStatus } from '@/store/rootReducer';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { CircularProgress } from '@mui/joy';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { CLASSES } from './constants';
import { SimpleSlider } from '../ProductCardImageSlider/ProductCardImageSlider';

export const ProductDetailsCard = () => {
    const dispatch = useAppDispatch();
    const currentProduct = useAppSelector(selectCurrentProduct);
    const isLoading = useAppSelector(selectLoadingStatus);
    const router = useRouter();
    const { productId } = router.query;
    const id = Array.isArray(productId) ? productId[0] : productId || 'undefined';

    useEffect(() => {
        if (!productId) {
            return;
        }
        dispatch(getProductByIdRequest(productId));
    }, [productId]);

    return (
        <div className={CLASSES.PRODUCT_CARD}>
            {isLoading ? (
                <CircularProgress className={CLASSES.SPINNER} size="lg" />
            ) : (
                <Card className={CLASSES.PRODUCT_CARD__CONTENT_WRAPPER}>
                    <CardContent>
                        <SimpleSlider images={currentProduct.images || []} />
                        <div className={CLASSES.PRODUCT_CARD__DESCRIPTION}>
                            <Typography
                                className={CLASSES.PRODUCT_CARD__DESCRIPTION_TEXT}
                            >
                                {currentProduct.brand}
                            </Typography>
                            <Typography
                                className={CLASSES.PRODUCT_CARD__DESCRIPTION_TEXT}
                                color="text.secondary"
                            >
                                {currentProduct.title}
                            </Typography>
                            <Typography
                                className={CLASSES.PRODUCT_CARD__DESCRIPTION_TEXT}
                                color="text.secondary"
                            >
                                Rating: {currentProduct.rating}
                            </Typography>
                            <Typography
                                className={CLASSES.PRODUCT_CARD__DESCRIPTION_TEXT}
                                variant="body2"
                            >
                                Price: ${currentProduct.price}
                            </Typography>
                            <Typography
                                variant="h6"
                                className={CLASSES.PRODUCT_CARD__DESCRIPTION_TEXT}
                            >
                                {currentProduct.description}.
                            </Typography>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button className={CLASSES.PRODUCT_CARD__GO_BACK_BUTTON}>
                            <Link href={ROUTES.DEFAULT}>Go Back</Link>
                        </Button>
                        <Button className={CLASSES.PRODUCT_CARD__READ_REVIEWS_BUTTON}>
                            <Link href={ROUTES.PRODUCT_REVIEWS.replace(':id', id)}>
                                Read Reviews
                            </Link>
                        </Button>
                    </CardActions>
                </Card>
            )}
        </div>
    );
};
