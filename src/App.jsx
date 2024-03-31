import { useState } from "react";
import "./App.css";
import Goals from "./components/Goals";
import Header from "./components/Header";
import Meals from "./components/Meals";
import ScheduleTab from "./components/ScheduleTab";
import SecondaryLists from "./components/SecondaryLists";
import List from "./components/list";
import "./index.css";
import {
  FoodIcon,
  GoalsIcon,
  ListsIcon,
  ScheduleIcon,
} from "./components/svgs";

function App() {
  const [areSecondaryListsVisible, setAreSecondaryListsVisible] =
    useState(true);
  const [areGoalsVisible, setAreGoalsVisible] = useState(false);
  const [areMealsVisible, setAreMealsVisible] = useState(false);
  const [isScheduleVisible, setIsScheduleVisible] = useState(false);

  function openSecondaryLists() {
    setAreSecondaryListsVisible(true);
  }

  function openGoals() {
    setAreGoalsVisible(true);
  }
  function openMeals() {
    setAreMealsVisible(true);
  }
  function openSchedule() {
    setIsScheduleVisible(true);
  }

  return (
    <div
      data-theme="pink"
      className="h-full font-poppins min-h-screen 
      bg-background dark:bg-dmBackground 
      text-onBackground dark:text-dmOnBackground/[87%]
      "
    >
      <div className="flex w-full h-full min-h-screen">
        <div
          id="primary-container"
          className="flex flex-col w-full h-full items-center"
        >
          <Header />
          <List listName={"Today"} />
        </div>
        <button
          onClick={openSecondaryLists}
          className={`m-5 flex items-center justify-center rounded-full w-10 h-10 text-background dark:text-dmBackground bg-primary dark:bg-dmPrimary absolute top-0 right-0 `}
        >
          <ListsIcon />
        </button>
        <button
          onClick={openGoals}
          className={`m-5 rounded-full flex items-center justify-center  w-10 h-10 text-background dark:text-dmBackground bg-primary dark:bg-dmPrimary absolute top-12 right-0 `}
        >
          <GoalsIcon />
        </button>
        <button
          onClick={openMeals}
          className={`m-5 rounded-full flex items-center justify-center w-10 h-10 text-background dark:text-dmBackground bg-primary dark:bg-dmPrimary absolute top-24 right-0 `}
        >
          <FoodIcon />
        </button>
        <button
          onClick={openSchedule}
          className={`m-5  rounded-full flex items-center justify-center w-10 h-10 text-background dark:text-dmBackground bg-primary dark:bg-dmPrimary absolute top-36 right-0 `}
        >
          <ScheduleIcon />
        </button>
        <SecondaryLists
          areSecondaryListsVisible={areSecondaryListsVisible}
          setAreSecondaryListsVisible={setAreSecondaryListsVisible}
        />
        <Goals
          areGoalsVisible={areGoalsVisible}
          setAreGoalsVisible={setAreGoalsVisible}
        />
        <Meals
          areMealsVisible={areMealsVisible}
          setAreMealsVisible={setAreMealsVisible}
        />
        <ScheduleTab
          isScheduleVisible={isScheduleVisible}
          setIsScheduleVisible={setIsScheduleVisible}
        />
      </div>
    </div>
  );
}

export default App;
