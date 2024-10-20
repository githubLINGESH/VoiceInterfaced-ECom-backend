import React, { useEffect, useState } from 'react';
import './slider.css';

interface TrendingProduct {
    id: number;
    imageUrl: string;
    productName: string;
}

interface SliderProps {
    trendingProducts: TrendingProduct[]; // Accept trending products as props
}

const Slider: React.FC<SliderProps> = ({ trendingProducts }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const totalSlides = trendingProducts.length;
    const visibleSlides = 5; // Number of visible slides in the container

    // Duplicate first few slides at the end for seamless looping
    const extendedSliderItems = [...trendingProducts, ...trendingProducts.slice(0, visibleSlides)];

    useEffect(() => {
        const moveSlider = () => {
            setIsTransitioning(true);
            setCurrentSlide((prevSlide) => prevSlide + 1);
        };
        const interval = setInterval(moveSlider, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isTransitioning && currentSlide === totalSlides) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentSlide(0);
            }, 500); // Match this timeout with the CSS transition duration
        }
    }, [currentSlide, isTransitioning, totalSlides]);

    return (
        <div className="slider-outer-container bg-gray-300">
            <div
                className="slider-cont"
                style={{
                    transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)`,
                    transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
                }}
            >
                {extendedSliderItems.map((product, index) => (
                    <div key={index} className="slider-it bg-darkslategray-100">
                        <img
                            className="slider-image object-contain"
                            alt={product.productName}
                            src={product.imageUrl}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Slider;
