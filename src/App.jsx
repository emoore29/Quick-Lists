import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import List from "./components/list";
import Schedule from "./components/schedule";
import "./index.css";
import SecondaryLists from "./components/SecondaryLists";

function App() {
  const [areSecondaryListsVisible, setAreSecondaryListsVisible] =
    useState(true);

  function openSecondaryLists() {
    setAreSecondaryListsVisible(true);
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
        <Schedule />
        <div
          id="primary-container"
          className="flex flex-col w-full h-full items-center"
        >
          <Header />
          <List listName={"Today"} />
        </div>
        <button
          onClick={openSecondaryLists}
          className={`m-5 text-3xl rounded-full w-10 h-10 text-background dark:text-dmBackground bg-primary dark:bg-dmPrimary absolute top-0 right-0 `}
        >
          +
        </button>

        <SecondaryLists
          areSecondaryListsVisible={areSecondaryListsVisible}
          setAreSecondaryListsVisible={setAreSecondaryListsVisible}
        />
      </div>
    </div>
  );
}

export default App;
