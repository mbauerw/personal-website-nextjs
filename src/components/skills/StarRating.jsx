import React, { useState, useEffect, useRef } from 'react';

const StarRating = ({ rating, skillName }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleMouseEnter = (index) => {
    setHoveredRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => {
        const isFilled = index < rating;
        const isHovered = hoveredRating > 0 && index < hoveredRating;
        
        return (
          <span
            key={index}
            className={`md:!w-6 md:!h-6 xs:!h-5 xs:!w-5 w-4 h-5 cursor-pointer transition-all duration-200 ease-in-out drop-shadow-sm select-none
              ${isHovered ? '#ff6b35' : (isFilled ? '#ffd700' : '#e2e8f0')}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            style={{
              color: isHovered ? '#ff6b35' : (isFilled ? '#000000' : '#e2e8f0'),
              transform: isHovered ? 'scale(1.4)' : 'scale(1.3)'
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;