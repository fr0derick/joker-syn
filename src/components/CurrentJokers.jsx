import React from "react";
import Joker from "./Joker";

const CurrentJokers = ({ jokers, onRemove, getSynergyDots }) => {
  return (
    <div
      className="w-full h-56 p-4 pixel-corners bg-balatro-transparentblack shadow-cardholder relative overflow-y-hidden"
      style={{ isolation: "isolate" }}
    >
      <div
        className="absolute inset-0 p-4 flex justify-center gap-4 items-center"
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
          jokers.map((joker) => (
            <div
              key={joker.id}
              className="relative"
              style={{ pointerEvents: "auto" }}
            >
              <Joker
                name={joker.name}
                onClick={() => onRemove(joker.id)}
                synergies={getSynergyDots(joker.name, true, joker.id)}
                isCurrentJoker={true}
                jokerId={joker.id}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CurrentJokers;
