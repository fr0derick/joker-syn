// src/components/JokerFinder.js

import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import DraggableJoker from './DraggableJoker';
import JokerCard from './JokerCard';
import config from '../config';

// Define a fixed color palette for synergy dots
const SYNERGY_COLOR_PALETTE = [
  '#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#FF8F33',
  '#8F33FF', '#33FFF6', '#FF3333', '#33FF8F', '#338FFF',
];

// Assign consistent colours based on synergy
const getColorFromString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
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
  const [overlapPerCard, setOverlapPerCard] = useState(0);
  const [jokerColors, setJokerColors] = useState({}); 

  const jokerGridRef = useRef(null);

  const CARD_WIDTH = 140;
  const CARD_HEIGHT = 150;
  const MARGIN_SIZE = 24;

  // Function to add a joker to ownedJokers
  const addJokerToOwned = (jokerName) => {
    const newJoker = {
      id: `owned-joker-${nextJokerId}`,
      name: jokerName,
    };
    setNextJokerId((prev) => prev + 1);
    setOwnedJokers((prevOwnedJokers) => [...prevOwnedJokers, newJoker]);
  };

  // Fetch all jokers from the backend
  useEffect(() => {
    const loadJokers = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/get_all_jokers`);
        if (!response.ok) throw new Error('Failed to fetch jokers');
        const data = await response.json();

        // Assign IDs based on names
        const jokersWithIds = data.map((joker) => ({
          name: joker,
          id: `joker-${joker}`,
        }));
        setAllJokers(jokersWithIds);
      } catch (error) {
        console.error('Error fetching jokers:', error);
      }
    };
    loadJokers();
  }, []);

  // Fetch synergies and assign colors when owned jokers change
  useEffect(() => {
    const findSynergies = async () => {
      if (ownedJokers.length === 0) {
        setSynergyData({});
        setJokerColors({});
        return;
      }
      try {
        const response = await fetch(`${config.API_BASE_URL}/find_synergies`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jokers: ownedJokers.map((joker) => joker.name) }),
        });
        if (!response.ok) throw new Error('Failed to fetch synergies');
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
        setJokerColors(colors);
      } catch (error) {
        console.error('Error fetching synergies:', error);
      }
    };
    findSynergies();
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
    setOwnedJokers((prevOwnedJokers) => prevOwnedJokers.filter((joker) => joker.id !== jokerId));
  };

  // Dynamic overlap logic to fit jokers in one row and manage overlap
  useEffect(() => {
    const container = jokerGridRef.current;
    if (container && ownedJokers.length > 0) {
      const containerWidth = container.clientWidth;
      const totalCards = ownedJokers.length;
      const totalWidthRequired = totalCards * (CARD_WIDTH + MARGIN_SIZE);

      if (totalWidthRequired > containerWidth) {
        const newOverlapPerCard = (totalWidthRequired - containerWidth) / (totalCards - 1);
        setOverlapPerCard(newOverlapPerCard);
      } else {
        setOverlapPerCard(0);
      }
    } else {
      setOverlapPerCard(0);
    }
  }, [ownedJokers]);

  // Sort synergetic jokers by most synergies and alphabetically
  const sortedSynergisticJokers = Object.keys(synergyData).sort((a, b) => {
    const countA = synergyData[a].count;
    const countB = synergyData[b].count;
    if (countA !== countB) return countB - countA;
    return a.localeCompare(b);
  });

  return (
    <div className="flex h-full bg-gray-100 p-8 min-h-0">
      {/* Left Panel */}
      <div className="w-1/2 border-r-4 border-gray-300 flex flex-col min-h-0">
        <h2 className="text-2xl font-bold mb-2">Your Jokers</h2>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="ownedJokers" direction="horizontal">
            {(provided) => (
              <div
                className="joker-grid"
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
                      synergyColors={jokerColors[jokerObj.name] || []}
                      cardWidth={CARD_WIDTH}
                      cardBorderWidth={0}
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
          <h2 className="text-lg font-semibold mb-2 -mt-4">Search for Joker</h2>
          <input
            type="text"
            className="border p-2 mb-3 w-full"
            placeholder="Input search"
            value={jokerInput}
            onChange={(e) => setJokerInput(e.target.value)}
          />
          <div className="find-joker-grid flex-1 overflow-auto">
            {allJokers
              .filter((joker) => joker.name.toLowerCase().startsWith(jokerInput.toLowerCase()))
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((joker) => (
                <div
                  key={joker.id}
                  className="joker-card bg-white p-4 rounded shadow m-3 -mb-4 cursor-pointer"
                  onClick={() => addJokerToOwned(joker.name)}
                >
                  <JokerCard name={joker.name} />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
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
    </div>
  );
};

export default JokerFinder;
