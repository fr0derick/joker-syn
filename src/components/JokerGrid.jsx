import React from "react";

const JokerGrid = ({ children, cols = 4, ySpacing = 160 }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "visible",
      }}
    >
      {React.Children.map(children, (child, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);

        const centerCol = (cols - 1) / 2;
        const distanceFromCenter = col - centerCol;

        const rotation = distanceFromCenter * 3;

        const arcOffset = Math.abs(distanceFromCenter) * 8;

        return (
          <div
            style={{
              position: "absolute",
              left: `${col * 25}%`,
              top: `${row * ySpacing - arcOffset}px`,
              width: "25%",
              height: "160px",
              transform: `rotate(${rotation}deg)`,
              transformOrigin: "center center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000 + index,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default JokerGrid;
