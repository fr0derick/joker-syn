import React from "react";
import Joker from "./Joker";
import PageSelector from "./PageSelector";
import JokerGrid from "./JokerGrid";

const SynergeticJokers = ({
  synergeticJokers,
  onJokerClick,
  getSynergyDots,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  synergySearchQuery,
  setSynergySearchQuery,
}) => {
  const filteredSynergeticJokers = synergeticJokers.filter((jokerName) =>
    jokerName.toLowerCase().includes(synergySearchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSynergeticJokers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedJokers = filteredSynergeticJokers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const displayCurrentPage =
    filteredSynergeticJokers.length === 0 ? 0 : currentPage;
  const displayTotalPages =
    filteredSynergeticJokers.length === 0 ? 0 : totalPages;

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-balatro-lightgreyshadow pixel-corners translate-y-1" />
      <div className="relative">
        <div className="bg-balatro-lightgrey pixel-corners p-1">
          <div className="w-full p-4 bg-balatro-grey pixel-corners relative">
            <h2 className="text-2xl -mt-2 mb-1 text-center tracking-widest">
              Synergetic Jokers
            </h2>
            <div className="mb-4 relative">
              <div className="absolute inset-0 tracking-wide bg-balatro-blackshadow pixel-corners-small translate-y-1" />
              <input
                type="text"
                placeholder="Search synergetic jokers..."
                value={synergySearchQuery}
                onChange={(e) => setSynergySearchQuery(e.target.value)}
                className="w-full p-2 bg-balatro-black pixel-corners-small tarcking-widest text-white placeholder-balatro-lightgrey relative"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-balatro-blackshadow pixel-corners translate-y-1" />
              <div className="bg-balatro-black pixel-corners p-2 relative h-[601px] overflow-visible">
                {displayedJokers.length === 0 ? (
                  <div className="col-span-4 text-center my-10 text-2xl opacity-50">
                    {synergeticJokers.length === 0
                      ? "Add jokers to see synergies"
                      : "No jokers match your search"}
                  </div>
                ) : (
                  <div className="relative mt-4 overflow-visible">
                    <JokerGrid cols={4} ySpacing={200}>
                      {displayedJokers.map((jokerName) => (
                        <Joker
                          key={jokerName}
                          name={jokerName}
                          onClick={() => onJokerClick(jokerName)}
                          synergies={getSynergyDots(jokerName)}
                          renderInfoTop={true}
                        />
                      ))}
                    </JokerGrid>
                  </div>
                )}
              </div>
            </div>
            <div className="-mb-4">
              <PageSelector
                currentPage={displayCurrentPage}
                totalPages={displayTotalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SynergeticJokers;
