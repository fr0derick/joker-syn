// src/utils/layoutUtils.js

export const calculateOverlap = (containerWidth, totalCards, cardWidth, marginSize) => {
    const totalWidthRequired = totalCards * (cardWidth + marginSize);
  
    if (totalWidthRequired > containerWidth) {
      return (totalWidthRequired - containerWidth) / (totalCards);
    } else {
      return 0;
    }
  };
  