import React from "react";
import { createPortal } from "react-dom";
import { jokerdata } from "../JokerData";

const getRarityText = (rarity) => {
  const rarityMap = {
    0: "Common",
    1: "Uncommon",
    2: "Rare",
    3: "Legendary",
  };
  return rarityMap[rarity] || "Unknown";
};

const getRarityStyles = (rarity) => {
  const styleMap = {
    0: {
      bg: "bg-balatro-blue",
      shadow: "bg-balatro-blueshadow",
      textShadow: "text-balatro-blueshadow",
    },
    1: {
      bg: "bg-balatro-green",
      shadow: "bg-balatro-greenshadow",
      textShadow: "text-balatro-greenshadow",
    },
    2: {
      bg: "bg-balatro-red",
      shadow: "bg-balatro-redshadow",
      textShadow: "text-balatro-redshadow",
    },
    3: {
      bg: "bg-balatro-purple",
      shadow: "bg-balatro-purpleshadow",
      textShadow: "text-balatro-purpleshadow",
    },
  };
  return styleMap[rarity] || styleMap[0];
};

const JokerInfo = ({
  jokerName,
  renderTop = false,
  show = false,
  position,
}) => {
  if (!show || !jokerName || !jokerdata[jokerName] || !position) return null;
  const joker = jokerdata[jokerName];
  const rarityText = getRarityText(joker.rarity);
  const rarityStyles = getRarityStyles(joker.rarity);

  const content = (
    <div
      className="fixed pointer-events-none font-game"
      style={{
        left: position.x,
        top: renderTop ? position.y - 8 : position.y + 8,
        transform: `translate(-50%, ${renderTop ? "-100%" : "0%"})`,
        zIndex: 9999,
        width: "176px",
      }}
    >
      <div className="relative m-2">
        <div className="absolute inset-0 bg-balatro-lightgreyshadow pixel-corners-medium translate-y-1" />
        <div className="relative">
          <div className="bg-balatro-lightgrey pixel-corners-medium p-[3px]">
            <div className="bg-balatro-black pixel-corners-medium p-2">
              <h3 className="text-2xl mb-1 text-center text-white text-shadow-pixel">
                {joker.name}
              </h3>
              <div className="relative">
                <div className="absolute inset-0 bg-balatro-whiteshadow pixel-corners-small translate-y-1" />
                <div className="bg-white text-balatro-black font-thin px-2 py-1 pixel-corners-small relative mb-2">
                  <p className="text-base text-center leading-4">
                    {joker.description}
                  </p>
                </div>
              </div>
              <div className="relative mx-8 mt-3">
                <div
                  className={`absolute inset-0 ${rarityStyles.shadow} pixel-corners-small translate-y-1`}
                />
                <div
                  className={`${rarityStyles.bg} pixel-corners-small text-center text-lg text-white`}
                >
                  <span
                    className="relative text-shadow-pixel"
                    style={{
                      textShadow: `0 2px 0 ${rarityStyles.textShadow.replace(
                        "text-",
                        ""
                      )}`,
                    }}
                  >
                    {rarityText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return createPortal(content, document.getElementById("joker-info-root"));
};

export default JokerInfo;
