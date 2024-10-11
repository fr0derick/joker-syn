import { useAnimationFrame } from 'framer-motion';

// Animation variants for different card states
export const cardVariants = {
  initial: {
    scale: 1,
    rotateZ: 0,
  },
  hovered: {
    scale: 1.05,
    rotateZ: [0, -2, 2, -1, 1, 0],
    transition: {
      rotateZ: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  },
  notHovered: {
    scale: 1,
    rotateZ: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  dragging: {
    opacity: 0.7,
    scale: 1.05,
    rotateZ: 8,
    transition: { duration: 0.01, }
  },
};

// Scale on click
export const tapEffect = {
  scale: 1,
};

// Function to handle tilt effect based on cursor movement
export const handleMouseMove = (e, cardRef, rotateX, rotateY) => {
  if (cardRef.current) {
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    const newRotateX = (y / height) * 50;
    const newRotateY = -(x / width) * 50;

    rotateX.set(newRotateX);
    rotateY.set(newRotateY);
  }
};

// Idle tilt animation using the framer-motion animation frame hook
export const useIdleTilt = (rotateX, rotateY, isHovered) => {
  const randomOffset = Math.random() * Math.PI * 2; // Offset phase
  const amplitude = 15; // tilt amplitude in degrees
  const speed = (2 * Math.PI) / 8; // rotational speed

  useAnimationFrame((t) => {
    if (!isHovered) {
      const time = t / 1000;
      const angle = speed * time + randomOffset;

      rotateX.set(Math.sin(angle) * amplitude);
      rotateY.set(Math.cos(angle) * amplitude);
    }
  });
};
