import React from "react";
import Joker from "./Joker";

const CurrentJokers = ({ jokers, onRemove, getSynergyDots }) => {
  const calculateSpacing = () => {
    if (jokers.length <= 1) return 0;

    const jokerWidth = 128;
    const initialGap = 20;
    const containerWidth = 1000;
    const maxWidth = (containerWidth * 5) / 6;

    const totalWidthNeeded =
      jokerWidth * jokers.length + initialGap * (jokers.length - 1);

    if (totalWidthNeeded <= maxWidth) {
      return initialGap;
    }

    const overlapNeeded = totalWidthNeeded - maxWidth;
    const spacingPerCard = initialGap - overlapNeeded / (jokers.length - 1);
    return Math.max(-jokerWidth + 30, spacingPerCard);
  };

  return (
    <div
      className="w-5/6 justify-self-center h-56 p-4 pixel-corners bg-balatro-transparentblack relative overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <div
        className="absolute inset-0 flex justify-center items-center"
        style={{
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        {jokers.length === 0 ? (
          <div className="w-full text-center text-2xl opacity-50">
            Add a joker to get started
          </div>
        ) : (
          <div
            className="flex justify-center items-center"
            style={{
              width: "80%",
              margin: "0 auto",
            }}
          >
            {jokers.map((joker, index) => (
              <div
                key={joker.id}
                className="relative"
                style={{
                  pointerEvents: "auto",
                  marginLeft: index === 0 ? 0 : `${calculateSpacing()}px`,
                  zIndex: index,
                }}
              >
                <Joker
                  name={joker.name}
                  onClick={() => onRemove(joker.id)}
                  synergies={getSynergyDots(joker.name, true, joker.id)}
                  isCurrentJoker={true}
                  jokerId={joker.id}
                  renderInfoTop={false}
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
