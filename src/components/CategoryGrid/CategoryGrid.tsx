import React, { useState, useEffect } from 'react';
import './CategoryGrid.css'; // Use a separate CSS file for styles

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

    // Handle next slide
    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex + 1) % categories.length
        );
    };

    // Handle previous slide
    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + categories.length) % categories.length
        );
    };

    // Auto-slide after 5 seconds
    useEffect(() => {
        const interval = setInterval(handleNext, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="category-carousel-wrapper">
            <h2 className="category-carousel-title">Categories</h2>
            <div className="category-carousel">
                <div
                    className="carousel-slider"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
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
