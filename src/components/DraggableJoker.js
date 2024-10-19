import React, { useState, useRef, useEffect } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { motion, useMotionValue, animate } from 'framer-motion';
import PropTypes from 'prop-types';
import JokerCard from './JokerCard';
import SynergyDots from './SynergyDots'; 
import { handleMouseMove, useIdleTilt } from '../utils/animations';

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

  // Rotation Motion values
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateZ = useMotionValue(0);

  const marginLeft = isFirst ? 0 : -overlapPerCard;

  // Idle tilt animation for smoother interactions
  useIdleTilt(rotateX, rotateY, isHovered);

  // Reset Z rotation upon drag end
  useEffect(() => {
    return rotateZ.onChange((latest) => {
      if (Math.abs(latest) < 0.01) {
        rotateZ.set(0);
      }
    });
  }, [rotateZ]);

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
            onMouseMove={(e) => isHovered && handleMouseMove(e, cardRef, rotateX, rotateY)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              ...provided.draggableProps.style,
              zIndex: snapshot.isDragging ? 999 : isHovered ? 1000 : 'auto',
              cursor: 'default',
            }}
            onClick={() => !snapshot.isDragging && removeJokerFromCollection(jokerObj.id)}
          >
            <motion.div
              ref={cardRef}
              className="joker-card"
              drag
              dragConstraints={cardRef}
              dragElastic={0}
              onDrag={(e, info) => {
                const inertiaRotation = info.velocity.x / 100;
                rotateZ.set(inertiaRotation);
              }}
              onDragEnd={() => {
                animate(rotateZ, 0, { type: 'spring', stiffness: 100, damping: 20 });
              }}
              style={{
                width: `${cardWidth}px`,
                borderWidth: `${cardBorderWidth}px`,
                rotateX,
                rotateY,
                rotateZ,
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
