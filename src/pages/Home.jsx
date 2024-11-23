import React, { useState } from "react";
import CurrentJokers from "../components/CurrentJokers";
import AllJokers from "../components/AllJokers";
import SynergeticJokers from "../components/SynergeticJokers";
import { jokerdata } from "../JokerData";

const Home = () => {
  const [currentJokers, setCurrentJokers] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [jokerColors, setJokerColors] = useState(new Map());
  const [searchQuery, setSearchQuery] = useState("");
  const [allJokersPage, setAllJokersPage] = useState(1);
  const [synergeticJokersPage, setSynergeticJokersPage] = useState(1);
  const itemsPerPage = 12;

  const addJoker = (jokerName) => {
    const newJoker = {
      id: nextId,
      name: jokerName,
    };
    const newColors = new Map(jokerColors);
    newColors.set(nextId, nextId);
    setCurrentJokers([...currentJokers, newJoker]);
    setJokerColors(newColors);
    setNextId(nextId + 1);
  };

  const removeJoker = (jokerId) => {
    setCurrentJokers(currentJokers.filter((joker) => joker.id !== jokerId));
    const newColors = new Map(jokerColors);
    newColors.delete(jokerId);
    setJokerColors(newColors);
  };

  const getSynergyDots = (
    jokerName,
    isCurrentJoker = false,
    jokerId = null
  ) => {
    const dots = new Set();
    currentJokers.forEach((currentJoker) => {
      if (isCurrentJoker) {
        if (jokerId === currentJoker.id) {
          dots.add(currentJoker.id);
        } else if (
          jokerdata[jokerName].synergies?.includes(currentJoker.name)
        ) {
          dots.add(currentJoker.id);
        }
      } else if (jokerdata[currentJoker.name].synergies?.includes(jokerName)) {
        dots.add(currentJoker.id);
      }
    });
    return Array.from(dots);
  };

  const getSynergeticJokers = () => {
    const synergeticMap = new Map();
    currentJokers.forEach((currentJoker) => {
      const synergies = jokerdata[currentJoker.name].synergies || [];
      synergies.forEach((synergyJoker) => {
        const synergyCount = synergeticMap.get(synergyJoker) || 0;
        synergeticMap.set(synergyJoker, synergyCount + 1);
      });
    });
    return Array.from(synergeticMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([jokerName]) => jokerName);
  };

  return (
    <div className="min-h-screen font-game flex flex-col items-center pt-8 text-white text-shadow-pixel">
      <div className="w-full max-w-7xl mb-4">
        <CurrentJokers
          jokers={currentJokers}
          onRemove={removeJoker}
          getSynergyDots={getSynergyDots}
        />
      </div>
      <div className="w-full max-w-7xl flex gap-6">
        <div className="w-1/2">
          <AllJokers
            onJokerClick={addJoker}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            currentPage={allJokersPage}
            setCurrentPage={setAllJokersPage}
            itemsPerPage={itemsPerPage}
          />
        </div>
        <div className="w-1/2">
          <SynergeticJokers
            synergeticJokers={getSynergeticJokers()}
            onJokerClick={addJoker}
            getSynergyDots={getSynergyDots}
            currentPage={synergeticJokersPage}
            setCurrentPage={setSynergeticJokersPage}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
