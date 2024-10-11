import React, { useState, useRef } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { motion, useMotionValue } from 'framer-motion';
import PropTypes from 'prop-types';
import JokerCard from './JokerCard';
import SynergyDots from './SynergyDots';
import { handleMouseMove, cardVariants, tapEffect, useIdleTilt } from '../utils/animations';

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
  const cardRef = useRef(null);

  // motion values for tilt effect
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // apply idle tilt anim using custom hook
  useIdleTilt(rotateX, rotateY, isHovered);

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
          {/* Shadow Element - wip */}
          <div
            className="joker-card-shadow"
            style={{
              position: 'absolute',
              top: '15px', 
              left: '-15px',
              width: `${cardWidth}px`,
              height: '100%',
              filter: 'grayscale(1) brightness(0.2) opacity(0.6)',
              transform: 'scale(1.05)',
              zIndex: -1,
              pointerEvents: 'none',
            }}
          >
            <JokerCard name={jokerObj.name} />
          </div>

          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onMouseEnter={() => {
              setIsHovered(true);
              rotateX.set(0);
              rotateY.set(0);
            }}
            onMouseMove={(e) => {
              if (isHovered) {
                handleMouseMove(e, cardRef, rotateX, rotateY);
              }
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              rotateX.set(0);
              rotateY.set(0);
            }}
            style={{
              ...provided.draggableProps.style,
              cursor: 'default',
              zIndex: isHovered ? 1000 : snapshot.isDragging ? 999 : 'auto',
            }}
            onClick={() => {
              if (!snapshot.isDragging) {
                removeJokerFromCollection(jokerObj.id);
              }
            }}
          >
            {/* Main Card Element */}
            <motion.div
              ref={cardRef}
              className="joker-card bg-white m-2 rounded shadow"
              variants={cardVariants}
              animate={snapshot.isDragging ? 'dragging' : undefined}
              whileTap={tapEffect}
              style={{
                willChange: 'transform, opacity',
                borderRadius: '5px',
                boxSizing: 'border-box',
                width: `${cardWidth}px`,
                borderWidth: `${cardBorderWidth}px`,
                borderColor: 'transparent',
                transition: 'transform 0.1s ease, box-shadow 0.1s ease',
                rotateX,
                rotateY,
              }}
            >
              <JokerCard name={jokerObj.name} />
            </motion.div>

            {/* Synergy Dots */}
            {synergyColors.length > 0 && <SynergyDots synergyColors={synergyColors} cardWidth={cardWidth} />}
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
