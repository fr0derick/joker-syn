export const sortSynergisticJokers = (synergyData) => {
    return Object.keys(synergyData).sort((a, b) => {
      const countA = synergyData[a].count;
      const countB = synergyData[b].count;
      if (countA !== countB) return countB - countA;
      return a.localeCompare(b);
    });
  };
  