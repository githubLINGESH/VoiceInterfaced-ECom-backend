import React from 'react';
import { useEffect, useState } from 'react';
import './slider.css';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const sliderItems = [
        "/kithremovebgpreview-1@2x.png",
        "/mobilesremovebgpreview-1@2x.png",
        "/earphonesremovebgpreview-1@2x.png",
        "/lapremovebgpreview-1@2x.png",
        "/lapremovebgpreview-1@2x.png",
        "/lapremovebgpreview-1@2x.png",
        "/lapremovebgpreview-1@2x.png"
    ];
    const totalSlides = sliderItems.length;
    const visibleSlides = 5; // Number of visible slides in the container

    // Duplicate first few slides at the end for seamless looping
    const extendedSliderItems = [...sliderItems, ...sliderItems.slice(0, visibleSlides)];

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
            }, 300); // Match this timeout with the CSS transition duration
        }
    }, [currentSlide, isTransitioning, totalSlides]);

    return (
        <div className="slider-outer-container bg-gray-300">
            <div
                className="slider-cont"
                style={{
                    transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)`,
                    transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none'
                }}
            >
                {extendedSliderItems.map((item, index) => (
                    <div key={index} className="slider-it bg-darkslategray-100">
                        <img
                            className="slider-image object-contain"
                            alt=""
                            src={item}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider;
