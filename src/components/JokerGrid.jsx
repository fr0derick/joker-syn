import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const JokerGrid = ({ children, cols = 4, ySpacing = 160 }) => {
  const childArray = React.Children.toArray(children);

  const rows = childArray.reduce((acc, child, index) => {
    const rowIndex = Math.floor(index / cols);
    if (!acc[rowIndex]) acc[rowIndex] = [];
    acc[rowIndex].push(child);
    return acc;
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "visible",
      }}
    >
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            position: "relative",
            height: `${ySpacing}px`,
            width: "100%",
          }}
        >
          <AnimatePresence mode="wait">
            {row.map((child, colIndex) => {
              const index = rowIndex * cols + colIndex;
              const col = index % cols;
              const centerCol = (cols - 1) / 2;
              const distanceFromCenter = col - centerCol;
              const isRightSide = distanceFromCenter > 0;

              const finalRotation = distanceFromCenter * 4;

              const finalPosition = col * 25;
              const rowCenterPosition = 50;
              const moveDistance = finalPosition - rowCenterPosition;

              return (
                <motion.div
                  key={`${rowIndex}-${colIndex}-${child.key}`}
                  style={{
                    position: "absolute",
                    left: `${finalPosition}%`,
                    top: "0px",
                    width: "25%",
                    height: "160px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000 + index,
                    transformOrigin: "center center",
                  }}
                  initial={{
                    x: -moveDistance * 4,
                    rotate: 0,
                    opacity: 0.9,
                  }}
                  animate={{
                    x: "0%",
                    rotate: finalRotation,
                    opacity: 1,
                  }}
                  exit={{
                    x: -moveDistance * 4,
                    rotate: isRightSide ? -70 : 70,
                    opacity: 0.8,
                    transition: {
                      duration: 0.05,
                      ease: "backIn",
                    },
                  }}
                  transition={{
                    x: {
                      type: "spring",
                      stiffness: 600,
                      damping: 18,
                      mass: 0.4,
                      velocity: 800,
                    },
                    rotate: {
                      type: "spring",
                      stiffness: 800,
                      damping: 18,
                      mass: 0.5,
                      velocity: isRightSide ? 1000 : -1000,
                    },
                  }}
                >
                  {child}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default JokerGrid;
