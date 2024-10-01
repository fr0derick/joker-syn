// src/components/DraggableJoker.js

import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import JokerCard from './JokerCard';

const DraggableJoker = ({
  jokerObj,
  index,
  removeJokerFromCollection,
  overlapPerCard,
  isFirst,
  synergyColors = [],
  cardWidth,
  cardBorderWidth,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    dragging: {
      opacity: 0.7,
      rotate: 8,
      transition: { duration: 0, ease: 'linear' },
    },
    notDragging: {
      opacity: 1,
      rotate: 0,
      transition: { duration: 0, ease: 'linear' },
    },
  };

  const marginLeft = isFirst ? 0 : -overlapPerCard;

  return (
    <Draggable key={jokerObj.id} draggableId={jokerObj.id} index={index}>
      {(provided, snapshot) => (
        <div
          style={{
            marginLeft: `${marginLeft}px`,
            flexShrink: 0,
            position: 'relative',
          }}
        >
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              ...provided.draggableProps.style,
              cursor: 'pointer',
              zIndex: isHovered ? 1000 : snapshot.isDragging ? 999 : 'auto',
            }}
            onClick={() => {
              if (!snapshot.isDragging) {
                removeJokerFromCollection(jokerObj.id);
              }
            }}
          >
            <motion.div
              className="joker-card bg-white m-2 rounded shadow"
              variants={variants}
              animate={snapshot.isDragging ? 'dragging' : 'notDragging'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                willChange: 'transform, opacity',
                borderRadius: '5px',
                boxSizing: 'border-box',
                width: `${cardWidth}px`,
                borderWidth: `${cardBorderWidth}px`,
                borderColor: 'transparent',
                transition: 'transform 0.1s ease, box-shadow 0.1s ease',
              }}
            >
              <JokerCard name={jokerObj.name} />
            </motion.div>

            {/* Synergy Dots */}
            {synergyColors.length > 0 && (
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
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

DraggableJoker.propTypes = {
  jokerObj: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  removeJokerFromCollection: PropTypes.func.isRequired,
  overlapPerCard: PropTypes.number.isRequired,
  isFirst: PropTypes.bool.isRequired,
  synergyColors: PropTypes.arrayOf(PropTypes.string),
  cardWidth: PropTypes.number.isRequired,
  cardBorderWidth: PropTypes.number.isRequired,
};

export default DraggableJoker;
