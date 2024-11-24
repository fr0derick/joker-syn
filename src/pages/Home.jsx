import React, { useState } from "react";
import CurrentJokers from "../components/CurrentJokers";
import AllJokers from "../components/AllJokers";
import SynergeticJokers from "../components/SynergeticJokers";
import { jokerdata } from "../JokerData";

const Home = () => {
  const [currentJokers, setCurrentJokers] = useState([]);
  const [nextId, setNextId] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [allJokersPage, setAllJokersPage] = useState(1);
  const [synergeticJokersPage, setSynergeticJokersPage] = useState(1);
  const itemsPerPage = 12;

  const addJoker = (jokerName) => {
    const newJoker = {
      id: nextId,
      name: jokerName,
    };
    setCurrentJokers([...currentJokers, newJoker]);
    setNextId(nextId + 1);
    setSynergeticJokersPage(1);
  };

  const removeJoker = (jokerId) => {
    setCurrentJokers(currentJokers.filter((joker) => joker.id !== jokerId));
    setSynergeticJokersPage(1);
  };

  const handleSearchQueryChange = (newQuery) => {
    setSearchQuery(newQuery);
    setAllJokersPage(1);
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
          dots.add(currentJoker.name);
        } else if (
          jokerdata[jokerName].synergies?.includes(currentJoker.name)
        ) {
          dots.add(currentJoker.name);
        }
      } else {
        if (jokerdata[currentJoker.name].synergies?.includes(jokerName)) {
          dots.add(currentJoker.name);
        }
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
    <div className="min-h-screen font-game flex flex-col items-center text-white text-shadow-pixel">
      <h1 className="text-4xl mt-4 mb-2">Joker Synergy Finder</h1>
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
            setSearchQuery={handleSearchQueryChange}
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
