import React from "react";
import Joker from "./Joker";
import { jokerdata } from "../JokerData";
import PageSelector from "./PageSelector.jsx";
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
      <div className="absolute inset-0 bg-balatro-lightgrey pixel-corners -m-1" />
      <div className="w-full h-[750px] p-4 bg-balatro-grey pixel-corners relative">
        <h2 className="text-3xl mb-2 text-center">All Jokers</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search jokers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 bg-balatro-black pixel-corners-small text-white placeholder-balatro-grey"
          />
        </div>
        <div className="bg-balatro-black shadow-cardholder pixel-corners p-2 h-[558px] relative">
          <div
            className="absolute inset-0 mt-7"
            style={{ overflow: "visible" }}
          >
            <JokerGrid cols={4} ySpacing={175}>
              {displayedJokers.map((jokerName) => (
                <Joker
                  key={jokerName}
                  name={jokerName}
                  onClick={() => onJokerClick(jokerName)}
                />
              ))}
            </JokerGrid>
          </div>
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

export default AllJokers;
