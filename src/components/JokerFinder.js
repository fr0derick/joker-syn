import React, { useState, useEffect, useRef } from 'react';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import { getColorFromString } from '../utils/colorUtils';
import { fetchAllJokers, fetchSynergies } from '../utils/api';
import { calculateOverlap } from '../utils/layoutUtils';
import { sortSynergisticJokers } from '../utils/sortingUtils';

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

  // Add a joker to the owned jokers collection
  const addJokerToOwned = (jokerName) => {
    const newJoker = { id: `owned-joker-${nextJokerId}`, name: jokerName };
    setNextJokerId((prevId) => prevId + 1);
    setOwnedJokers((prev) => [...prev, newJoker]);
  };

  // Fetch all jokers on component mount
  useEffect(() => {
    const loadJokers = async () => {
      try {
        const jokersWithIds = await fetchAllJokers();
        setAllJokers(jokersWithIds);
      } catch (error) {
        console.error('Error fetching jokers:', error);
      }
    };
    loadJokers();
  }, []);

  // Fetch synergies and assign colors whenever ownedJokers change
  useEffect(() => {
    const updateSynergies = async () => {
      if (ownedJokers.length === 0) {
        setSynergyData({});
        setJokerColors({});
        return;
      }
      try {
        const data = await fetchSynergies(ownedJokers);
        setSynergyData(data);

        // Assign synergy colors
        const colors = Object.keys(data).reduce((acc, jokerName) => {
          const synergizedWith = data[jokerName].synergizedWith || [];
          acc[jokerName] = synergizedWith.map((synergyJoker) =>
            getColorFromString([jokerName, synergyJoker].sort().join('-'))
          );
          return acc;
        }, {});
        setJokerColors(colors);
      } catch (error) {
        console.error('Error fetching synergies:', error);
      }
    };
    updateSynergies();
  }, [ownedJokers]);

  // Handle drag end for reordering owned jokers
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedJokers = Array.from(ownedJokers);
    const [reorderedItem] = reorderedJokers.splice(result.source.index, 1);
    reorderedJokers.splice(result.destination.index, 0, reorderedItem);
    setOwnedJokers(reorderedJokers);
  };

  // Remove a joker from the collection
  const removeJokerFromCollection = (jokerId) => {
    setOwnedJokers((prev) => prev.filter((joker) => joker.id !== jokerId));
  };

  // Recalculate overlap on window resize or when owned jokers change
  useEffect(() => {
    const calculateCardOverlap = () => {
      const container = jokerGridRef.current;
      if (container && ownedJokers.length > 0) {
        const containerWidth = container.clientWidth;
        setOverlapPerCard(calculateOverlap(containerWidth, ownedJokers.length, CARD_WIDTH, MARGIN_SIZE));
      } else {
        setOverlapPerCard(0);
      }
    };

    calculateCardOverlap();
    window.addEventListener('resize', calculateCardOverlap);
    return () => window.removeEventListener('resize', calculateCardOverlap);
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
        removeJokerFromCollection={removeJokerFromCollection}
        overlapPerCard={overlapPerCard}
        jokerColors={jokerColors}
      />

      <RightPanel
        jokerFilter={jokerFilter}
        setJokerFilter={setJokerFilter}
        sortedSynergisticJokers={sortSynergisticJokers(synergyData)}
        synergyData={synergyData}
        ownedJokers={ownedJokers}
        addJokerToOwned={addJokerToOwned}
      />
    </div>
  );
};

export default JokerFinder;
