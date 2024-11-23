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
}) => {
  const totalPages = Math.ceil(synergeticJokers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedJokers = synergeticJokers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-balatro-lightgrey pixel-corners -m-1" />
      <div className="w-full h-[750px] p-4 bg-balatro-grey pixel-corners relative">
        <h2 className="text-3xl mb-4 text-center">Synergetic Jokers</h2>
        <div className="bg-balatro-black shadow-cardholder pixel-corners p-2 h-[610px] relative">
          {displayedJokers.length === 0 ? (
            <div className="col-span-4 text-center my-auto text-xl opacity-50">
              Add jokers to see synergies
            </div>
          ) : (
            <div
              className="absolute inset-0 mt-9"
              style={{ overflow: "visible" }}
            >
              <JokerGrid cols={4} ySpacing={200}>
                {displayedJokers.map((jokerName) => (
                  <Joker
                    key={jokerName}
                    name={jokerName}
                    onClick={() => onJokerClick(jokerName)}
                    synergies={getSynergyDots(jokerName)}
                  />
                ))}
              </JokerGrid>
            </div>
          )}
        </div>
        <PageSelector
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default SynergeticJokers;
