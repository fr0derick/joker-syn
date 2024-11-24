import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import SynergyDots from "./SynergyDots";
import JokerInfo from "./JokerInfo";

const Joker = ({ name, onClick, synergies = [], renderInfoTop = false }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState(null);
  const cardRef = useRef(null);

  const updatePosition = useCallback(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left + rect.width / 2,
        y: renderInfoTop ? rect.top : rect.bottom,
      });
    }
  }, [renderInfoTop]);

  useEffect(() => {
    if (isHovering) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isHovering, updatePosition]);

  const imageName = name.replace(/\s+/g, "_");
  const imagePath = `/images/jokers/${imageName}.png`;

  const variants = {
    initial: {},
    animate: {
      rotateX: [0, 5, 0, -5, 0],
      rotateY: [0, -5, 0, 5, 0],
      rotate: [0, 2, 0, -2, 0],
      transition: {
        duration: 3 + Math.random() * 2,
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
    <>
      <motion.div
        ref={cardRef}
        className="cursor-pointer w-32 select-none"
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
          zIndex: isHovering ? 50 : 1,
          WebkitUserDrag: "none",
          userDrag: "none",
          WebkitTouchCallout: "none",
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
            className="rounded-lg shadow-2xl select-none"
            style={{
              transformStyle: "preserve-3d",
              isolation: "isolate",
              position: "relative",
              WebkitUserDrag: "none",
              userDrag: "none",
              WebkitTouchCallout: "none",
            }}
          >
            {!imageError ? (
              <img
                src={imagePath}
                alt={name}
                className="w-full h-full object-cover pixelated select-none"
                draggable="false"
                onError={() => setImageError(true)}
                onClick={onClick}
                style={{
                  WebkitUserDrag: "none",
                  userDrag: "none",
                  WebkitTouchCallout: "none",
                }}
                onDragStart={(e) => e.preventDefault()}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center select-none"
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
          <div style={{ position: "relative" }}>
            <SynergyDots colorIds={synergies} />
          </div>
        )}
      </motion.div>
      <JokerInfo
        jokerName={name}
        renderTop={renderInfoTop}
        show={isHovering}
        position={position}
      />
    </>
  );
};

export default Joker;
