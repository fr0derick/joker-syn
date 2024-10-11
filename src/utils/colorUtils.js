// src/utils/colorUtils.js

export const SYNERGY_COLOR_PALETTE = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#FF8F33',
    '#8F33FF', '#33FFF6', '#FF3333', '#33FF8F', '#338FFF',
  ];
  
  // Assign consistent colors based on synergy
  export const getColorFromString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i += 1) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash) % SYNERGY_COLOR_PALETTE.length;
    return SYNERGY_COLOR_PALETTE[colorIndex];
  };
  