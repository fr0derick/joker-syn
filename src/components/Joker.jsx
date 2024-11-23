import React, { useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import SynergyDots from "./SynergyDots";

const Joker = ({
  name,
  onClick,
  synergies = [],
  isCurrentJoker = false,
  jokerId = null,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const imageName = name.replace(/\s+/g, "_");
  const imagePath = `/images/jokers/${imageName}.png`;

  const variants = {
    initial: {},
    animate: {
      rotateX: [0, 2.5, 0, -2.5, 0],
      rotateY: [0, -2.5, 0, 2.5, 0],
      rotate: [0, 1, 0, -1, 0],
      transition: {
        duration: 5 + Math.random() * 2,
        ease: "easeInOut",
        repeat: Infinity,
        delay: Math.random() * 2,
        times: [0, 0.25, 0.5, 0.75, 1],
      },
    },
    hover: {
      scale: [1, 1.05, 1.04, 1.05, 1.04],
      rotateX: [0, -1, 2, -1],
      rotateY: [0, 2, -3, 1],
      rotate: [0, -2, 1, -0.5],
      transition: {
        duration: 0.2,
        ease: "backOut",
      },
    },
  };

  return (
    <motion.div
      className="cursor-pointer w-32"
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={variants}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        position: "relative",
        zIndex: isHovering ? 1100 : 1000,
      }}
    >
      <Tilt
        className="w-full h-full"
        tiltEnable={true}
        tiltMaxAngleX={20}
        tiltMaxAngleY={20}
        perspective={1000}
        scale={isHovering ? 1.05 : 1}
        transitionSpeed={200}
        tiltReverse={true}
        trackOnWindow={false}
        gyroscope={false}
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor="#ffffff"
        glarePosition="all"
        glareBorderRadius="8px"
      >
        <div
          className="rounded-lg shadow-lg"
          style={{
            transformStyle: "preserve-3d",
            isolation: "isolate",
            position: "relative",
          }}
        >
          {!imageError ? (
            <img
              src={imagePath}
              alt={name}
              className="w-full h-full object-cover pixelated"
              onError={() => setImageError(true)}
              onClick={onClick}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              onClick={onClick}
            >
              {name}
            </div>
          )}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 30px rgba(0,0,0,0.25)",
              borderRadius: "8px",
            }}
          />
        </div>
      </Tilt>
      {Array.isArray(synergies) && synergies.length > 0 && (
        <div style={{ position: "relative", zIndex: isHovering ? 1101 : 1001 }}>
          <SynergyDots colorIds={synergies} />
        </div>
      )}
    </motion.div>
  );
};

export default Joker;
