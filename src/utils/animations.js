import { useEffect } from 'react';
import { animate } from 'framer-motion';

/**
 * Card animation variants for different states (initial, hovered, notHovered, dragging)
 */
export const cardVariants = {
  initial: { scale: 1, rotateZ: 0 },
  hovered: {
    scale: 1,
    rotateZ: [0, -4, 4, -2, 2, 0],
    transition: {
      rotateZ: { duration: 0.2, ease: 'linear' },
    },
  },
  notHovered: {
    scale: 1,
    rotateZ: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  dragging: {
    opacity: 1,
    scale: 1,
    rotateZ: 8,
    transition: { duration: 0.01 },
  },
};

/**
 * Tap or click effect - scales down slightly on tap
 */
export const tapEffect = { scale: 0.95 };

/**
 * Tilt card based on mouse movement within the card's bounding box.
 * @param {MouseEvent} e - Mouse event
 * @param {Object} cardRef - Ref to the card element 
 * @param {Object} rotateX - for x-axis rotation
 * @param {Object} rotateY - y-axis rotation
 */
export const handleMouseMove = (e, cardRef, rotateX, rotateY) => {
  if (!cardRef.current) return;

  const { left, top, width, height } = cardRef.current.getBoundingClientRect();
  const x = e.clientX - left - width / 2;
  const y = e.clientY - top - height / 2;

  rotateX.set((y / height) * 50);
  rotateY.set(-(x / width) * 50);
};

/**
 * Custom hook to apply idle tilt animation when the card is not hovered or dragged.
 * @param {Object} rotateX - Framer-motion useMotionValue for X-axis rotation
 * @param {Object} rotateY - Framer-motion useMotionValue for Y-axis rotation
 * @param {boolean} isHovered - Flag indicating if the card is hovered
 */
export const useIdleTilt = (rotateX, rotateY, isHovered) => {
  useEffect(() => {
    let animationFrameId;
    const randomOffset = Math.random() * Math.PI * 2;
    const amplitude = 15;
    const speed = (2 * Math.PI) / 8;

    const updateTilt = (time) => {
      if (!isHovered) {
        const currentTime = time / 1000;
        const angle = speed * currentTime + randomOffset;

        rotateX.set(Math.sin(angle) * amplitude);
        rotateY.set(Math.cos(angle) * amplitude);
      }
      animationFrameId = requestAnimationFrame(updateTilt);
    };

    animationFrameId = requestAnimationFrame(updateTilt);
    return () => cancelAnimationFrame(animationFrameId);
  }, [rotateX, rotateY, isHovered]);
};

/**
 * Apply inertia-based rotation based on the drag velocity.
 * @param {Object} rotateZ - Framer-motion useMotionValue for Z-axis rotation
 * @param {Object} velocityX - Drag velocity on the X-axis
 */
export const applyInertiaOnDrag = (rotateZ, velocityX) => {
  rotateZ.set(velocityX / 100);
};

/**
 * Reset the Z-axis rotation to zero with a spring animation after dragging ends.
 * @param {Object} rotateZ - Framer-motion useMotionValue for Z-axis rotation
 */
export const resetRotationOnDragEnd = (rotateZ) => {
  animate(rotateZ, 0, { type: 'spring', stiffness: 300, damping: 20 });
};
