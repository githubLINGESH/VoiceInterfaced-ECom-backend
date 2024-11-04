import React, { useState, useEffect, useRef } from 'react';
import './CategoryGrid.css';

interface Category {
    name: string;
    imageUrl: string;
    link: string;
    orientation: 'portrait' | 'landscape';
}

interface CategoryCarouselProps {
    categories: Category[];
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ categories }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const carouselRef = useRef<HTMLDivElement | null>(null);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + categories.length) % categories.length
        );
    };

    useEffect(() => {
        const interval = setInterval(handleNext, 8000);
        return () => clearInterval(interval);
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX - translateX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setTranslateX(e.clientX - startX);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (translateX < -100) {
            handleNext();
        } else if (translateX > 100) {
            handlePrev();
        }
        setTranslateX(0);
    };

    return (
        <div className="category-carousel-wrapper">
            <h2 className="category-carousel-title">Categories</h2>
            <div
                className="category-carousel"
                ref={carouselRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => setIsDragging(false)}
            >
                <div
                    className="carousel-slider"
                    style={{
                        transform: `translateX(calc(-${currentIndex * (100 / 3)}% + ${translateX}px))`,
                        transition: isDragging ? 'none' : 'transform 1.5s ease-in-out',
                    }}
                >
                    {categories.map((category, index) => (
                        <a
                            href={category.link}
                            key={index}
                            className={`carousel-item ${category.orientation}`}
                        >
                            <img src={category.imageUrl} alt={category.name} />
                            <div className="carousel-title">{category.name}</div>
                        </a>
                    ))}
                </div>
            </div>
            <button className="prev-btn" onClick={handlePrev}>
                &#10094;
            </button>
            <button className="next-btn" onClick={handleNext}>
                &#10095;
            </button>
        </div>
    );
};

export default CategoryCarousel;
