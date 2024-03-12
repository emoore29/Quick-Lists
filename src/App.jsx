import { useEffect, useState } from "react";
import "./App.css";
import List from "./components/list";
import { CancelX } from "./components/svgs";
import ThemeSwitch from "./components/themeSwitch";
import "./index.css";
import { dateString, day } from "./utils/dates";
import Schedule from "./components/schedule";

function App() {
  const [dateTime, setDateTime] = useState(new Date());
  const [cardList, setCardList] = useState(() => {
    const savedList = localStorage.getItem("Card List");
    if (savedList) {
      return JSON.parse(savedList);
    } else {
      return ["Primary"];
    }
  });
  const [newCardName, setNewCardName] = useState("");
  const [newCard, setNewCard] = useState(false);
  const [isSecondaryListVisible, setSecondaryListVisible] = useState(false);

  // CLOCK TIMER
  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Saves cardList to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("Card List", JSON.stringify(cardList));
  }, [cardList]);

  function addCard(e) {
    e.preventDefault();
    const newCardList = [...cardList];
    newCardList.push(newCardName);
    setCardList(newCardList);

    // reset values for adding a new card to default
    setNewCardName("");
    setNewCard(false);
  }

  function closeSecondaryLists() {
    setSecondaryListVisible(false);
  }

  function openSecondaryLists() {
    setSecondaryListVisible(true);
  }

  return (
    <div
      data-theme="pink"
      className="h-full font-poppins min-h-screen
      bg-background dark:bg-dmBackground 
      text-onBackground dark:text-dmOnBackground/[87%]
      "
    >
      <header
        id="header"
        className="px-10 py-10 w-full m-auto
          flex justify-center items-center gap-5
          "
      >
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-lg font-normal">
            <span className="text-primary dark:text-dmPrimary">
              {day + " "}
            </span>
            <span>{dateString + " "}</span>
            <span className="opacity-60 text-lg">
              {dateTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </h1>
        </div>

        <div className="flex items-center">
          <ThemeSwitch
            color="var(--color-primary)"
            dmColor="var(--color-darkmode-primary)"
          />
        </div>
      </header>
      <main className="flex items-center justify-center mx-auto p-10 gap-3 w-full h-full">
        {cardList.map(
          (cardName, index) =>
            cardName === "Primary" && (
              <List
                key={cardName + index}
                index={index}
                cardList={cardList}
                setCardList={setCardList}
                listName={cardName}
              />
            )
        )}
        <Schedule />
        <button
          onClick={openSecondaryLists}
          className={`m-5 text-3xl rounded-full w-10 h-10 text-background dark:text-dmBackground bg-primary dark:bg-dmPrimary border-sky-500 absolute top-0 left-0 `}
        >
          +
        </button>
        <section
          id="secondaryLists"
          className={`${
            isSecondaryListVisible ? "" : "hidden"
          } overflow-auto fixed top-0 left-0 flex flex-col bg-surface dark:bg-dmRaisedSurface p-10 h-full w-1/4 min-w-min`}
        >
          <button
            onClick={closeSecondaryLists}
            aria-label="Close secondary tasks"
            className="absolute top-0 right-0 m-5"
          >
            <CancelX />
          </button>
          {cardList.map(
            (cardName, index) =>
              cardName !== "Primary" && (
                <List
                  key={cardName + index}
                  index={index}
                  cardList={cardList}
                  setCardList={setCardList}
                  listName={cardName}
                />
              )
          )}
          <div className="mb-4">
            {newCard ? (
              <button
                className="hover:text-primary dark:hover:text-dmPrimary"
                onClick={() => setNewCard(false)}
              >
                Cancel
              </button>
            ) : (
              <button
                className="hover:text-primary dark:hover:text-dmPrimary"
                onClick={() => setNewCard(true)}
              >
                Create new list
              </button>
            )}

            {newCard && (
              <form onSubmit={addCard} className="mb-4">
                <input
                  type="text"
                  className="text-sm text-black"
                  value={newCardName}
                  onChange={(e) => setNewCardName(e.target.value)}
                ></input>
                <button
                  className="hover:text-primary dark:hover:text-dmPrimary"
                  type="submit"
                >
                  Add list
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
