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
  CleaningIcon,
  FoodIcon,
  GoalsIcon,
  ListsIcon,
  RepeatDailyIcon,
  ScheduleIcon,
} from "./components/svgs";
import DailyTasks from "./components/RepeatDaily";
import Cleaning from "./components/Cleaning";

function App() {
  const [areSecondaryListsVisible, setAreSecondaryListsVisible] =
    useState(true);
  const [areGoalsVisible, setAreGoalsVisible] = useState(false);
  const [areMealsVisible, setAreMealsVisible] = useState(false);
  const [isScheduleVisible, setIsScheduleVisible] = useState(false);
  const [areDailyTasksVisible, setAreDailyTasksVisible] = useState(false);
  const [isCleaningVisible, setIsCleaningVisible] = useState(false);

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

  function setAllToFalse() {
    setAreSecondaryListsVisible(false);
    setAreGoalsVisible(false);
    setAreMealsVisible(false);
    setIsScheduleVisible(false);
    setAreDailyTasksVisible(false);
    setIsCleaningVisible(false);
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
        <div className="">
          <button
            onClick={() => {
              setAllToFalse();
              openSecondaryLists();
            }}
            className={`m-5 flex items-center justify-center rounded-full w-10 h-10 text-background dark:text-dmBackground bg-primary dark:bg-dmPrimary `}
          >
            <ListsIcon />
          </button>
          <button
            onClick={() => {
              setAllToFalse();
              openGoals();
            }}
            className={`m-5 rounded-full flex items-center justify-center  w-10 h-10 text-background dark:text-dmBackground bg-primary dark:bg-dmPrimary`}
          >
            <GoalsIcon />
          </button>
          <button
            onClick={() => {
              setAllToFalse();
              openMeals();
            }}
            className={`m-5 rounded-full flex items-center justify-center w-10 h-10 text-background dark:text-dmBackground bg-primary dark:bg-dmPrimary `}
          >
            <FoodIcon />
          </button>
          <button
            onClick={() => {
              setAllToFalse();
              openSchedule();
            }}
            className={`m-5  rounded-full flex items-center justify-center w-10 h-10 text-background dark:text-dmBackground bg-primary dark:bg-dmPrimary`}
          >
            <ScheduleIcon />
          </button>
          <button
            onClick={() => {
              setAllToFalse();
              setAreDailyTasksVisible(true);
            }}
            className={`m-5  rounded-full flex items-center justify-center w-10 h-10 text-background dark:text-dmBackground bg-primary dark:bg-dmPrimary  `}
          >
            <RepeatDailyIcon />
          </button>
          <button
            onClick={() => {
              setAllToFalse();
              setIsCleaningVisible(true);
            }}
            className={`m-5  rounded-full flex items-center justify-center w-10 h-10 text-background dark:text-dmBackground bg-primary dark:bg-dmPrimary `}
          >
            <CleaningIcon />
          </button>
        </div>

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
        <DailyTasks
          areDailyTasksVisible={areDailyTasksVisible}
          setAreDailyTasksVisible={setAreDailyTasksVisible}
        />
        <Cleaning
          isCleaningVisible={isCleaningVisible}
          setIsCleaningVisible={setIsCleaningVisible}
        />
      </div>
    </div>
  );
}

export default App;
