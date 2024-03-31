import { CancelX } from "./svgs";
import { useState, useEffect } from "react";
import List from "./list";

export default function Goals({ areGoalsVisible, setAreGoalsVisible }) {
  const [goals, setGoals] = useState(() => {
    const savedList = localStorage.getItem("Goals");
    if (savedList) {
      return JSON.parse(savedList);
    } else {
      return ["Main"];
    }
  });

  // Saves goals to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("Goals", JSON.stringify(goals));
  }, [goals]);

  function closeGoals() {
    setAreGoalsVisible(false);
  }

  return (
    <div
      id="goals"
      className={`${
        areGoalsVisible ? "" : "hidden"
      } relative flex flex-col bg-surface dark:bg-dmSurface p-10 max-h- w-full overflow-y-auto`}
    >
      <h2 className="mb-5 text-center">Goals</h2>{" "}
      <button
        onClick={closeGoals}
        aria-label="Close goals"
        className="absolute top-0 right-0 m-5"
      >
        <CancelX />
      </button>
      <div className="columns-2 gap-5">
        {goals &&
          goals.map((cardName, index) => (
            <List
              key={cardName + index}
              index={index}
              secondaryLists={goals}
              setSecondaryLists={setGoals}
              listName={cardName}
            />
          ))}
      </div>
    </div>
  );
}
