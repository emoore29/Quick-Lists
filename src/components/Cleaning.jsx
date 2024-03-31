import { CancelX } from "./svgs";
import { useState, useEffect } from "react";
import List from "./list";

export default function Cleaning({ isCleaningVisible, setIsCleaningVisible }) {
  const [cleaning, setCleaning] = useState(() => {
    const savedList = localStorage.getItem("Cleaning");
    if (savedList) {
      return JSON.parse(savedList);
    } else {
      return ["Daily", "Weekly", "Monthly", "Occasionally"];
    }
  });

  // Saves meals to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("Cleaning", JSON.stringify(cleaning));
  }, [cleaning]);

  function closeCleaning() {
    setIsCleaningVisible(false);
  }

  return (
    <div
      id="secondaryLists"
      className={`${
        isCleaningVisible ? "" : "hidden"
      } relative flex flex-col bg-surface dark:bg-dmSurface p-10 max-h-[1000px]  min-h-screen  w-full overflow-y-auto`}
    >
      <h2 className="mb-5 text-center">Cleaning</h2>{" "}
      <button
        onClick={closeCleaning}
        aria-label="Close cleaning"
        className="absolute top-0 right-0 m-5"
      >
        <CancelX />
      </button>
      <div className="columns-2 gap-5">
        {cleaning &&
          cleaning.map((cardName, index) => (
            <List
              key={cardName + index}
              index={index}
              secondaryLists={cleaning}
              setSecondaryLists={setCleaning}
              listName={cardName}
            />
          ))}
      </div>
    </div>
  );
}
