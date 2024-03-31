import { CancelX } from "./svgs";
import { useState, useEffect } from "react";
import List from "./list";

export default function DailyTasks({
  areDailyTasksVisible,
  setAreDailyTasksVisible,
}) {
  const [dailyTasks, setDailyTasks] = useState(() => {
    const savedList = localStorage.getItem("Daily");
    if (savedList) {
      return JSON.parse(savedList);
    } else {
      return ["Everyday"];
    }
  });

  // Saves daily tasks to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("Daily", JSON.stringify(dailyTasks));
  }, [dailyTasks]);

  function closeDailyTasks() {
    setAreDailyTasksVisible(false);
  }

  return (
    <div
      id="goals"
      className={`${
        areDailyTasksVisible ? "" : "hidden"
      } relative flex flex-col bg-surface dark:bg-dmSurface p-10 max-h-[1000px]  min-h-screen  w-full overflow-y-auto`}
    >
      <h2 className="mb-5 text-center">Daily Tasks</h2>{" "}
      <button
        onClick={closeDailyTasks}
        aria-label="Close goals"
        className="absolute top-0 right-0 m-5"
      >
        <CancelX />
      </button>
      <div className="columns-2 gap-5">
        {dailyTasks &&
          dailyTasks.map((cardName, index) => (
            <List
              key={cardName + index}
              index={index}
              secondaryLists={dailyTasks}
              setSecondaryLists={setDailyTasks}
              listName={cardName}
            />
          ))}
      </div>
    </div>
  );
}
