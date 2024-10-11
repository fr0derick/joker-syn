// components/SynergyDots.js

import React from 'react';
import PropTypes from 'prop-types';

const SynergyDots = ({ synergyColors, cardWidth }) => (
  <div
    className="synergy-dots"
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: '3px',
      justifyContent: 'center',
      alignItems: 'center',
      width: `${cardWidth}px`,
      margin: '0 auto',
    }}
  >
    {synergyColors.map((color, idx) => (
      <div
        key={idx}
        style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          backgroundColor: color,
          margin: '2px',
          border: '2px solid black',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
        title={`Synergy ${idx + 1}`}
      />
    ))}
  </div>
);

SynergyDots.propTypes = {
  synergyColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  cardWidth: PropTypes.number.isRequired,
};

export default SynergyDots;
