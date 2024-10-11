import React, { useState, useEffect, useRef } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import DraggableJoker from './DraggableJoker';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { getColorFromString, SYNERGY_COLOR_PALETTE } from '../utils/colorUtils';
import { fetchAllJokers, fetchSynergies } from '../utils/api'; // Import API functions
import { calculateOverlap } from '../utils/layoutUtils'; // Import layout utility
import { sortSynergisticJokers } from '../utils/sortingUtils'; // Import sorting utility

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
        const jokersWithIds = await fetchAllJokers(); // Use the refactored API call
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
        const data = await fetchSynergies(ownedJokers); // Use the refactored API call
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
      const newOverlapPerCard = calculateOverlap(containerWidth, ownedJokers.length, CARD_WIDTH, MARGIN_SIZE); // Use refactored layout utility
      setOverlapPerCard(newOverlapPerCard);
    } else {
      setOverlapPerCard(0);
    }
  }, [ownedJokers]);

  return (
    <div className="flex h-full bg-gray-100 p-8 min-h-0">
      <LeftPanel
        jokerInput={jokerInput}
        setJokerInput={setJokerInput}
        allJokers={allJokers}
        addJokerToOwned={addJokerToOwned}
        ownedJokers={ownedJokers}
        jokerGridRef={jokerGridRef}
        handleOnDragEnd={handleOnDragEnd}
        CARD_HEIGHT={CARD_HEIGHT}
        CARD_WIDTH={CARD_WIDTH}
        MARGIN_SIZE={MARGIN_SIZE}
        removeJokerFromCollection={removeJokerFromCollection}
        overlapPerCard={overlapPerCard}
        jokerColors={jokerColors}
      />

      <RightPanel
        jokerFilter={jokerFilter}
        setJokerFilter={setJokerFilter}
        sortedSynergisticJokers={sortSynergisticJokers(synergyData)} // Use refactored sorting utility
        synergyData={synergyData}
        ownedJokers={ownedJokers}
        addJokerToOwned={addJokerToOwned}
      />
    </div>
  );
};

export default JokerFinder;
