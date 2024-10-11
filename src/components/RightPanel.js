// src/components/RightPanel.js

import React from 'react';
import JokerCard from './JokerCard';
import PropTypes from 'prop-types';

const RightPanel = ({
  jokerFilter,
  setJokerFilter,
  sortedSynergisticJokers,
  synergyData,
  ownedJokers,
  addJokerToOwned,
}) => (
  <div className="w-1/2 p-6 flex flex-col min-h-0">
    <h2 className="text-2xl font-bold mb-4">Synergetic Jokers</h2>
    <input
      type="text"
      className="border p-2 w-full mb-2"
      placeholder="Filter synergizing jokers"
      value={jokerFilter}
      onChange={(e) => setJokerFilter(e.target.value)}
    />
    <div className="synergy-grid flex-1 overflow-auto pt-6 pr-2 overflow-x-hidden">
      {sortedSynergisticJokers.length > 0 ? (
        sortedSynergisticJokers
          .filter((joker) => joker.toLowerCase().startsWith(jokerFilter.toLowerCase()))
          .map((joker) => {
            const synergizedWith = synergyData[joker].synergizedWith.filter((synergyJoker) =>
              ownedJokers.some((owned) => owned.name === synergyJoker)
            );

            return (
              <div
                key={joker}
                className="synergy-card bg-white p-4 rounded shadow mb-2 cursor-pointer"
                onClick={() => addJokerToOwned(joker)}
              >
                <JokerCard name={joker} />
                <div className="synergy-info text-sm text-gray-600">
                  Synergizes with: {synergizedWith.length} ({synergizedWith.join(', ')})
                </div>
              </div>
            );
          })
      ) : (
        <div className="synergetic-jokers-message">Synergetic jokers shown here</div>
      )}
    </div>
  </div>
);

RightPanel.propTypes = {
  jokerFilter: PropTypes.string.isRequired,
  setJokerFilter: PropTypes.func.isRequired,
  sortedSynergisticJokers: PropTypes.array.isRequired,
  synergyData: PropTypes.object.isRequired,
  ownedJokers: PropTypes.array.isRequired,
  addJokerToOwned: PropTypes.func.isRequired,
};

export default RightPanel;
