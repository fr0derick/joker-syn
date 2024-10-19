import React from 'react';
import PropTypes from 'prop-types';
import AnimatedJokerCard from './AnimatedJokerCard';

const RightPanel = ({
  jokerFilter,
  setJokerFilter,
  sortedSynergisticJokers,
  synergyData,
  ownedJokers,
  addJokerToOwned,
}) => {
  /**
   * Get synergy information for a specific joker.
   * @param {string} joker
   * @returns {array}
   */
  const getSynergyInfo = (joker) => (
    synergyData[joker]?.synergizedWith.filter(synergyJoker =>
      ownedJokers.some(owned => owned.name === synergyJoker)
    ) || []
  );

  return (
    <div className="w-1/2 p-4 flex flex-col min-h-0">
      <h2 className="text-2xl font-bold mb-4">Synergetic Jokers</h2>

      <input
        type="text"
        className="border p-2 w-full mb-1 "
        placeholder="Filter synergizing jokers"
        value={jokerFilter}
        onChange={(e) => setJokerFilter(e.target.value)}
      />

      <div className="synergy-grid flex-1 overflow-auto overflow-x-hidden">
        {sortedSynergisticJokers.length > 0 ? (
          sortedSynergisticJokers
            .filter(joker =>
              joker.toLowerCase().startsWith(jokerFilter.toLowerCase())
            )
            .map(joker => {
              const synergizedWith = getSynergyInfo(joker);
              return (
                <div key={joker} className="mb-0">
                  <AnimatedJokerCard
                    joker={{ name: joker }}
                    onClick={() => addJokerToOwned(joker)}
                    CARD_WIDTH={140}
                  />
                  <div className="synergy-info text-sm text-gray-600 font-bold p-2">
                    Synergizes with: {synergizedWith.length} ({synergizedWith.join(', ')})
                  </div>
                </div>
              );
            })
        ) : (
          <div className="synergetic-jokers-message">
            Select a joker to show synergies here.
          </div>
        )}
      </div>
    </div>
  );
};

RightPanel.propTypes = {
  jokerFilter: PropTypes.string.isRequired,
  setJokerFilter: PropTypes.func.isRequired,
  sortedSynergisticJokers: PropTypes.arrayOf(PropTypes.string).isRequired,
  synergyData: PropTypes.objectOf(
    PropTypes.shape({
      synergizedWith: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  ownedJokers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  addJokerToOwned: PropTypes.func.isRequired,
};

export default RightPanel;
