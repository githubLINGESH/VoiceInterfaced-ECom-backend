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
    onCategorySelect: (categoryName: string) => void;
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ categories, onCategorySelect }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const carouselRef = useRef<HTMLDivElement | null>(null);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
        setTranslateX(0); // Reset the translateX value
    };
    
    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + categories.length) % categories.length
        );
        setTranslateX(0); // Reset the translateX value
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
    
        // Calculate the distance threshold for swapping
        const swapThreshold = 100;
    
        if (translateX < -swapThreshold) {
            // Swap to the next item
            handleNext();
        } else if (translateX > swapThreshold) {
            // Swap to the previous item
            handlePrev();
        } else {
            // Reset the position
            setTranslateX(0);
        }
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
                            key={index}
                            className={`carousel-item ${category.orientation}`}
                            onClick={() => onCategorySelect(category.name)} // Call onCategorySelect on click
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