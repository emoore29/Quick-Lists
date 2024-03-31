import { CancelX } from "./svgs";
import { useState, useEffect } from "react";
import List from "./list";

export default function Meals({ areMealsVisible, setAreMealsVisible }) {
  const [meals, setMeals] = useState(() => {
    const savedList = localStorage.getItem("Meals");
    if (savedList) {
      return JSON.parse(savedList);
    } else {
      return ["Breakfasts", "Lunches", "Dinners", "Snacks"];
    }
  });

  // Saves meals to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("Meals", JSON.stringify(meals));
  }, [meals]);

  function closeMeals() {
    setAreMealsVisible(false);
  }

  return (
    <div
      id="secondaryLists"
      className={`${
        areMealsVisible ? "" : "hidden"
      } relative flex flex-col bg-surface dark:bg-dmSurface p-10 max-h- w-full overflow-y-auto`}
    >
      <h2 className="mb-5 text-center">Meals</h2>{" "}
      <button
        onClick={closeMeals}
        aria-label="Close meals"
        className="absolute top-0 right-0 m-5"
      >
        <CancelX />
      </button>
      <div className="columns-2 gap-5">
        {meals &&
          meals.map((cardName, index) => (
            <List
              key={cardName + index}
              index={index}
              secondaryLists={meals}
              setSecondaryLists={setMeals}
              listName={cardName}
            />
          ))}
      </div>
    </div>
  );
}
