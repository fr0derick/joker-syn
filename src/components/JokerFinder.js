// src/components/JokerFinder.js

import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import DraggableJoker from './DraggableJoker';
import JokerCard from './JokerCard';

// Define a fixed color palette for synergy dots
const SYNERGY_COLOR_PALETTE = [
  '#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#FF8F33', '#8F33FF',
  '#33FFF6', '#FF3333', '#33FF8F', '#338FFF'
];

const getColorFromString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % SYNERGY_COLOR_PALETTE.length;
  return SYNERGY_COLOR_PALETTE[colorIndex];
};

const JokerFinder = () => {
  const [allJokers, setAllJokers] = useState([]);
  const [jokerInput, setJokerInput] = useState('');
  const [jokerFilter, setJokerFilter] = useState('');
  const [ownedJokers, setOwnedJokers] = useState([]);
  const [synergyData, setSynergyData] = useState({});
  const [nextJokerId, setNextJokerId] = useState(0);
  const [isOverlapping, setIsOverlapping] = useState(false);
  const jokerGridRef = useRef(null);
  const [overlapPerCard, setOverlapPerCard] = useState(0);
  const [jokerColors, setJokerColors] = useState({}); // Store synergy colors for jokers

  const CARD_WIDTH = 140;
  const CARD_HEIGHT = 150;

  // Fetch all jokers from the backend (TXT file)
  useEffect(() => {
    const loadJokers = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_all_jokers');
        if (!response.ok) {
          throw new Error('Failed to fetch jokers');
        }
        const data = await response.json();
        const jokersWithIds = data.map((joker, idx) => ({
          name: joker,
          id: `joker-${nextJokerId + idx}`,
        }));
        setAllJokers(jokersWithIds);
        setNextJokerId((prev) => prev + jokersWithIds.length);
      } catch (error) {
        console.error('Error fetching jokers:', error);
      }
    };
    loadJokers();
  }, []);

  // Fetch synergies and assign colors when owned jokers change
  useEffect(() => {
    if (ownedJokers.length > 0) {
      const findSynergies = async () => {
        try {
          const response = await fetch('http://localhost:5000/find_synergies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jokers: ownedJokers.map((joker) => joker.name) }),
          });
          if (!response.ok) {
            throw new Error('Failed to fetch synergies');
          }
          const data = await response.json();
          setSynergyData(data);

          // Assign synergy colors
          const colors = {};
          Object.keys(data).forEach((jokerName) => {
            const synergizedWith = data[jokerName].synergizedWith || [];
            colors[jokerName] = synergizedWith.map((synergyJoker) =>
              getColorFromString([jokerName, synergyJoker].sort().join('-'))
            );
          });

          setJokerColors(colors); // Map of joker names to arrays of colors

        } catch (error) {
          console.error('Error fetching synergies:', error);
        }
      };
      findSynergies();
    } else {
      setSynergyData({});
      setJokerColors({});
    }
  }, [ownedJokers]);

  // Handle drag end
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(ownedJokers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setOwnedJokers(items);
  };

  // Function to remove a joker on click
  const removeJokerFromCollection = (jokerId) => {
    setOwnedJokers(ownedJokers.filter((joker) => joker.id !== jokerId));
  };

  // Dynamic overlap logic
  useEffect(() => {
    const container = jokerGridRef.current;
    if (container && ownedJokers.length > 0) {
      const containerWidth = container.clientWidth;
      const totalCards = ownedJokers.length;
      let newOverlapPerCard = 0;

      const cardTotalWidth = totalCards * CARD_WIDTH;

      if (cardTotalWidth > containerWidth) {
        newOverlapPerCard = (cardTotalWidth - containerWidth) / (totalCards - 1);
        newOverlapPerCard = Math.max(0, newOverlapPerCard);
      }

      setOverlapPerCard(newOverlapPerCard);
      setIsOverlapping(newOverlapPerCard > 0);
    } else {
      setOverlapPerCard(0);
      setIsOverlapping(false);
    }
  }, [ownedJokers]);

  // Sort synergetic jokers by most synergies and alphabetically
  const sortedSynergisticJokers = Object.keys(synergyData)
    .sort((a, b) => {
      const countA = synergyData[a].count;
      const countB = synergyData[b].count;
      if (countA !== countB) {
        return countB - countA; // Sort by synergy count (descending)
      }
      return a.localeCompare(b); // If counts are the same, sort alphabetically
    });

  return (
    <div className="flex h-full bg-gray-100 p-8 min-h-0">
      <div className="w-1/2 p-4 border-r-4 border-gray-300 flex flex-col min-h-0">
        <h2 className="text-2xl font-bold mb-4">Your Jokers</h2>

        <DragDropContext onDragEnd={handleOnDragEnd} dropAnimation={{ duration: 0 }}>
          <Droppable droppableId="ownedJokers" direction="horizontal">
            {(provided) => (
              <div
                className={`joker-grid ${isOverlapping ? 'overlap' : ''}`}
                {...provided.droppableProps}
                ref={(el) => {
                  provided.innerRef(el);
                  jokerGridRef.current = el;
                }}
                style={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                  overflow: 'hidden',
                  position: 'relative',
                  alignItems: 'flex-start',
                  minHeight: `${CARD_HEIGHT + 60}px`,
                }}
              >
                {ownedJokers.length > 0 ? (
                  ownedJokers.map((jokerObj, index) => (
                    <DraggableJoker
                      key={jokerObj.id}
                      jokerObj={jokerObj}
                      index={index}
                      removeJokerFromCollection={removeJokerFromCollection}
                      overlapPerCard={overlapPerCard}
                      isFirst={index === 0}
                      synergyColors={jokerColors[jokerObj.name] || []} // Pass array of colors
                      cardWidth={CARD_WIDTH}
                      cardBorderWidth={0} // No border
                    />
                  ))
                ) : (
                  <div className="no-jokers-message">No Jokers</div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="mt-6 flex flex-col flex-1 min-h-0">
          <h2 className="text-lg font-semibold mb-2">Search for Joker</h2>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Input search"
            value={jokerInput}
            onChange={(e) => setJokerInput(e.target.value)}
          />
          <div className="find-joker-grid mt-4 flex-1 overflow-auto">
            {allJokers
              .filter((joker) => joker.name.toLowerCase().startsWith(jokerInput.toLowerCase()))
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((joker) => (
                <div
                  key={joker.id}
                  className="joker-card bg-white p-4 rounded shadow mb-2 cursor-pointer"
                  onClick={() => {
                    const newJoker = {
                      id: `joker-${nextJokerId}`,
                      name: joker.name,
                    };
                    setNextJokerId((prev) => prev + 1);
                    setOwnedJokers([...ownedJokers, newJoker]);
                  }}
                >
                  <JokerCard name={joker.name} />
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="w-1/2 p-4 flex flex-col min-h-0">
        <h2 className="text-2xl font-bold mb-4">Synergetic Jokers</h2>
        <input
          type="text"
          className="border p-2 w-full mb-4"
          placeholder="Filter synergizing jokers"
          value={jokerFilter}
          onChange={(e) => setJokerFilter(e.target.value)}
        />
        <div className="synergy-grid flex-1 overflow-auto">
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
                    onClick={() =>
                      setOwnedJokers([...ownedJokers, { id: `joker-${nextJokerId}`, name: joker }])
                    }
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
    </div>
  );
};

export default JokerFinder;
