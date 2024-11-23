import React from "react";

const SynergyDots = ({ colorIds }) => {
  const existingColors = new Set();

  const isColorTooSimilar = (hue) => {
    for (let existingHue of existingColors) {
      const hueDiff = Math.abs(hue - existingHue);
      if (hueDiff < 30 || 360 - hueDiff < 30) return true;
    }
    return false;
  };

  const generateHSLColor = (id) => {
    let hue = (id * 137.508) % 360;

    while (isColorTooSimilar(hue)) {
      hue = (hue + 47.23) % 360;
    }

    existingColors.add(hue);
    return `hsl(${hue}, 75%, 55%)`;
  };

  return (
    <div className="flex flex-row flex-wrap mt-1 justify-center items-center w-32 mx-auto">
      {colorIds.map((id) => (
        <div
          key={id}
          className="w-3.5 h-3.5 rounded-full m-0.5 border-2 border-black shadow-md"
          style={{ backgroundColor: generateHSLColor(id) }}
        />
      ))}
    </div>
  );
};

export default SynergyDots;
