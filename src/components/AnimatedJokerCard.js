import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import PropTypes from 'prop-types';
import JokerCard from './JokerCard';
import { handleMouseMove, cardVariants, tapEffect } from '../utils/animations';

const AnimatedJokerCard = ({ joker, onClick, CARD_WIDTH }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Initialize motion values for tilting effect
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateZ = useMotionValue(0);

  // Function to reset all rotations
  const resetRotation = () => {
    animate(rotateX, 0);
    animate(rotateY, 0);
    animate(rotateZ, 0);
  };

  // Reset Z rotation when dragging ends
  useEffect(() => {
    return rotateZ.onChange((latest) => {
      if (Math.abs(latest) < 0.01) rotateZ.set(0);
    });
  }, [rotateZ]);

  return (
    <motion.div
      className="joker-card bg-white p-3 rounded m-3 -mb-4 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={(e) => isHovered && handleMouseMove(e, cardRef, rotateX, rotateY)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetRotation();
      }}
      onClick={onClick}
      variants={cardVariants}
      initial="initial"
      animate={isHovered ? 'hovered' : 'notHovered'}
      whileTap={tapEffect}
      style={{
        willChange: 'transform',
        borderRadius: '5px',
        width: `${CARD_WIDTH}px`,
        transition: 'box-shadow 0.1s ease',
        rotateX,
        rotateY,
        rotateZ,
      }}
      ref={cardRef}
    >
      <JokerCard name={joker.name} />
    </motion.div>
  );
};

AnimatedJokerCard.propTypes = {
  joker: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  CARD_WIDTH: PropTypes.number.isRequired,
};

export default AnimatedJokerCard;
