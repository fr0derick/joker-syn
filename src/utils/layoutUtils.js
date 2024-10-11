export const calculateOverlap = (containerWidth, totalCards, cardWidth, marginSize) => {
    const totalWidthRequired = totalCards * (cardWidth + marginSize);
  
    if (totalWidthRequired > containerWidth) {
      return (totalWidthRequired - containerWidth) / (totalCards - 1);
    } else {
      return 0;
    }
  };
  