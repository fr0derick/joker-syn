import React from "react";
import Joker from "./Joker";
import { jokerdata } from "../JokerData";
import PageSelector from "./PageSelector";
import JokerGrid from "./JokerGrid";

const AllJokers = ({
  onJokerClick,
  searchQuery,
  setSearchQuery,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}) => {
  const filteredJokers = Object.keys(jokerdata).filter((jokerName) =>
    jokerName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredJokers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedJokers = filteredJokers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-balatro-lightgreyshadow pixel-corners translate-y-1" />
      <div className="relative">
        <div className="bg-balatro-lightgrey pixel-corners p-1">
          <div className="w-full p-4 bg-balatro-grey pixel-corners relative">
            <h2 className="text-2xl -mt-2 mb-1 text-center tracking-widest">
              Add Jokers
            </h2>
            <div className="mb-4 relative">
              <div className="absolute inset-0 tracking-wide bg-balatro-blackshadow pixel-corners-small translate-y-1" />
              <input
                type="text"
                placeholder="Search jokers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 bg-balatro-black pixel-corners-small tarcking-widest text-white placeholder-balatro-lightgrey relative"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-balatro-blackshadow pixel-corners translate-y-1" />
              <div className="bg-balatro-black h-[545px] pixel-corners p-2 relative overflow-visible">
                <div className="relative mt-2 overflow-visible">
                  <JokerGrid cols={4} ySpacing={175}>
                    {displayedJokers.map((jokerName) => (
                      <Joker
                        key={jokerName}
                        name={jokerName}
                        onClick={() => onJokerClick(jokerName)}
                        renderInfoTop={true}
                      />
                    ))}
                  </JokerGrid>
                </div>
              </div>
            </div>
            <div className="-mb-4">
              <PageSelector
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJokers;
