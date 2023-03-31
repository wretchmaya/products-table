import React from 'react';
import Image from 'mui-image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

interface SliderProps {
    images: string[];
}
export const SimpleSlider = ({ images }: SliderProps): JSX.Element => {
    return (
        <>
            <Swiper
                pagination={true}
                navigation={true}
                loop={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                {images.map((url, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <Image
                                src={url}
                                alt={url}
                                width="580px"
                                height="320px"
                                fit="cover"
                                showLoading={true}
                                errorIcon={true}
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
};
