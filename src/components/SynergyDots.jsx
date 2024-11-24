import React, { useMemo } from "react";

const SynergyDots = ({ colorIds }) => {
  const colorPairCache = useMemo(() => new Map(), []);

  const checkHueDiff = (diff) => diff < 30 || 360 - diff < 30;

  const isColorPairTooSimilar = (colors1, colors2) => {
    const hueDiff1 = Math.abs(colors1[0] - colors2[0]);
    const hueDiff2 = Math.abs(colors1[1] - colors2[1]);
    const hueDiff3 = Math.abs(colors1[0] - colors2[1]);
    const hueDiff4 = Math.abs(colors1[1] - colors2[0]);
    return (
      checkHueDiff(hueDiff1) ||
      checkHueDiff(hueDiff2) ||
      checkHueDiff(hueDiff3) ||
      checkHueDiff(hueDiff4)
    );
  };

  const isSingleColorTooSimilar = (hue, existingPairs) => {
    return existingPairs.some((pair) => checkHueDiff(Math.abs(hue - pair[0])));
  };

  const hasAnySimilarPair = (testPair, existingPairs) => {
    return existingPairs.some((existingPair) =>
      isColorPairTooSimilar(testPair, existingPair)
    );
  };

  const generateColorPair = (id) => {
    const uniqueId = typeof id === "string" ? id : id.toString();

    if (colorPairCache.has(uniqueId)) {
      return colorPairCache.get(uniqueId);
    }

    const hashCode = uniqueId.split("").reduce((acc, char) => {
      const hash = (acc << 5) - acc + char.charCodeAt(0);
      return hash & hash;
    }, 0);

    let hue1 = Math.abs(hashCode * 137.508) % 360;
    let hue2 = hue1;

    const existingPairs = Array.from(colorPairCache.values());

    if (existingPairs.length >= 6) {
      hue2 = (hue1 + 147.423) % 360;
      let attempts = 0;
      let currentPair = [hue1, hue2];

      while (attempts < 50 && hasAnySimilarPair(currentPair, existingPairs)) {
        hue1 = (hue1 + 47.23) % 360;
        hue2 = (hue2 + 47.23) % 360;
        currentPair = [hue1, hue2];
        attempts++;
      }
    } else {
      let attempts = 0;
      while (attempts < 50 && isSingleColorTooSimilar(hue1, existingPairs)) {
        hue1 = (hue1 + 47.23) % 360;
        hue2 = hue1;
        attempts++;
      }
    }

    const pair = [hue1, hue2];
    colorPairCache.set(uniqueId, pair);
    return pair;
  };

  const getGradientStyle = (colorPair) => {
    const [hue1, hue2] = colorPair;
    return {
      background: `linear-gradient(135deg, 
        hsl(${hue1}, 75%, 55%) 0%, 
        hsl(${hue1}, 75%, 55%) 45%, 
        hsl(${hue2}, 75%, 55%) 55%, 
        hsl(${hue2}, 75%, 55%) 100%)`,
    };
  };

  const uniqueColorIds = [...new Set(colorIds)];

  return (
    <div className="flex flex-row flex-wrap mt-1 justify-center items-center w-32 mx-auto">
      {uniqueColorIds.map((id) => (
        <div
          key={id}
          className="w-3.5 h-3.5 rounded-full m-0.5 border-2 border-black shadow-md"
          style={getGradientStyle(generateColorPair(id))}
        />
      ))}
    </div>
  );
};

export default SynergyDots;
