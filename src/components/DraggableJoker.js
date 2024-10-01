// src/components/DraggableJoker.js

import React from 'react';
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
  const variants = {
    dragging: {
      opacity: 0.7,
      rotate: 8,
      transition: { duration: 0.01, ease: 'linear' },
    },
    notDragging: {
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.01, ease: 'linear' },
    },
  };

  const marginLeft = isFirst ? 0 : -overlapPerCard;

  return (
    <Draggable key={jokerObj.id} draggableId={jokerObj.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            cursor: 'pointer',
            zIndex: snapshot.isDragging ? 999 : 'auto',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft: `${marginLeft}px`,
            position: 'relative',
            verticalAlign: 'top',
          }}
          onClick={() => {
            if (!snapshot.isDragging) {
              removeJokerFromCollection(jokerObj.id);
            }
          }}
        >
          <motion.div
            className="joker-card bg-white m-3 rounded shadow"
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
                marginTop: '5px',
                justifyContent: 'center',
                maxWidth: `${cardWidth}px`,
              }}
            >
              {synergyColors.map((color, idx) => (
                <span
                  key={idx}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: color,
                    margin: '2px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    border: '1px solid black',
                  }}
                  title={`Synergy ${idx + 1}`}
                />
              ))}
            </div>
          )}
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
