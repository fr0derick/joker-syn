import React from "react";
import Joker from "./Joker";

const CurrentJokers = ({ jokers, onRemove, getSynergyDots }) => {
  const calculateOverlap = () => {
    if (jokers.length <= 1) return 0;

    const jokerWidth = 128;
    const containerWidth = 1000;
    const maxWidth = (containerWidth * 5) / 6;

    const totalWidthNeeded = jokerWidth * jokers.length;

    if (totalWidthNeeded <= maxWidth) {
      return 0;
    }

    const overlapNeeded = totalWidthNeeded - maxWidth;
    return overlapNeeded / (jokers.length - 1);
  };

  return (
    <div
      className="w-full h-56 p-4 pixel-corners bg-balatro-transparentblack shadow-cardholder relative overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <div
        className="absolute inset-0 p-4 flex justify-center items-center"
        style={{
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        {jokers.length === 0 ? (
          <div className="w-full text-center text-xl opacity-50">
            Select a joker to get started
          </div>
        ) : (
          <div
            className="flex justify-center items-center"
            style={{
              width: "83.333%",
              margin: "0 auto",
            }}
          >
            {jokers.map((joker, index) => (
              <div
                key={joker.id}
                className="relative"
                style={{
                  pointerEvents: "auto",
                  marginLeft: index === 0 ? 0 : `-${calculateOverlap()}px`,
                  zIndex: index,
                }}
              >
                <Joker
                  name={joker.name}
                  onClick={() => onRemove(joker.id)}
                  synergies={getSynergyDots(joker.name, true, joker.id)}
                  isCurrentJoker={true}
                  jokerId={joker.id}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentJokers;
