import React, { useState } from 'react';
import PropTypes from 'prop-types';

const JokerCard = ({ name, className = '', imgClassName = '' }) => {
  const [imgError, setImgError] = useState(false);
  const [imgType, setImgType] = useState('png');

  const formattedName = name.replace(/\s+/g, '_');
  const imgSrc = `/images/jokers/${formattedName}.${imgType}`;

  const handleImageError = () => {
    if (imgType === 'png') {
      setImgType('gif');
    } else {
      setImgError(true);
    }
  };

  const commonStyles = {
    display: 'block',
    width: '100%',
    height: 'auto',
  };

  return (
    <div className={`joker-card-wrapper relative ${className}`}>
      {imgError ? (
        <div className="joker-card-text text-center font-bold">
          {name}
        </div>
      ) : (
        <>
          <img
            src={imgSrc}
            alt={name}
            className={`joker-card-image mt-2 ${imgClassName}`}
            onError={handleImageError}
            style={commonStyles}
          />
          <div className="joker-card-name text-center mt-2 font-semibold">
            {name}
          </div>
        </>
      )}
    </div>
  );
};

JokerCard.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  imgClassName: PropTypes.string,
};

export default JokerCard;
