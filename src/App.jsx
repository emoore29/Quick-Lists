import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import List from "./components/list";
import Schedule from "./components/schedule";
import "./index.css";
import SecondaryLists from "./components/SecondaryLists";

function App() {
  const [areSecondaryListsVisible, setAreSecondaryListsVisible] =
    useState(false);

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
      <Header />
      <main className="flex items-center justify-center mx-auto p-10 gap-3 w-full h-full">
        <Schedule />
        <List listName={"Today"} />
        <button
          onClick={openSecondaryLists}
          className={`m-5 text-3xl rounded-full w-10 h-10 text-background dark:text-dmBackground bg-primary dark:bg-dmPrimary border-sky-500 absolute top-0 left-0 `}
        >
          +
        </button>
        <SecondaryLists
          areSecondaryListsVisible={areSecondaryListsVisible}
          setAreSecondaryListsVisible={setAreSecondaryListsVisible}
        />
      </main>
    </div>
  );
}

export default App;
