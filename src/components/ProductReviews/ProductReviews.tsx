import { useRouter } from 'next/router';
import { selectCurrentProductReviews, selectLoadingStatus } from '@/store/rootReducer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { getProductReviewsByIdRequest } from '@/store/api';
import { CircularProgress } from '@mui/joy';
import { Button, Typography, Container } from '@mui/material';
import { CLASSES } from './constants';

export const ProductReviews = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const productReviews = useAppSelector(selectCurrentProductReviews);
    const isLoading = useAppSelector(selectLoadingStatus);
    const router = useRouter();
    const { productId } = router.query;

    useEffect(() => {
        if (!productId) {
            return;
        }
        dispatch(getProductReviewsByIdRequest(productId));
    }, [productId]);

    return (
        <>
            {isLoading ? (
                <CircularProgress className={CLASSES.SPINNER} size="lg" />
            ) : (
                <div className={CLASSES.REVIEWS}>
                    <div className={CLASSES.REVIEWS_CONTAINER}>
                        {productReviews.map(
                            (review: { email: string; body: string; id: number }) => {
                                const author = review.email;
                                const reviewText = review.body;
                                return (
                                    <section key={review.id}>
                                        <h3>{author}</h3>
                                        <p>{reviewText}</p>
                                    </section>
                                );
                            }
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
