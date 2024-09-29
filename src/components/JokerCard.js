import React, { useState } from 'react';
import PropTypes from 'prop-types';

const JokerCard = ({ name, className = '' }) => {
  const [imgError, setImgError] = useState(false);
  const [imgType, setImgType] = useState('png'); // Initialize the image type as 'png'

  const formattedName = name.replace(/\s+/g, '_'); // Replace spaces with underscores
  const imgSrc = `/images/jokers/${formattedName}.${imgType}`; // Dynamically use png or gif based on imgType

  // Function to handle image load errors
  const handleImageError = () => {
    if (imgType === 'png') {
      // If png fails, try gif
      setImgType('gif');
    } else {
      // If gif also fails, fallback to text
      setImgError(true);
    }
  };

  return (
    <div className={`joker-card-wrapper ${className}`}>
      {imgError ? (
        <div className="joker-card-text">
          {name}
        </div>
      ) : (
        <>
          <img 
            src={imgSrc} 
            alt={name} 
            className="joker-card-image" 
            onError={handleImageError} // Handle error and fallback to gif or text
          />
          <div className="joker-card-name">{name}</div> {/* Display name below the image */}
        </>
      )}
    </div>
  );
};

JokerCard.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default JokerCard;
