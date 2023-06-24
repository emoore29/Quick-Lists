import { useState, useEffect } from "react";
import { SquaresPlus, Plus, CancelX } from "./components/svgs";
import "./App.css";
import "./index.css";
import ThemeSwitch from "./components/themeSwitch";
import List from "./components/list";
import { day, dateString } from "./utils/dates";

function App() {
  // value = current date and time
  const [dateTime, setDateTime] = useState(new Date());
  const [cardList, setCardList] = useState(() => {
    const savedList = localStorage.getItem("Card List");
    if (savedList) {
      return JSON.parse(savedList);
    } else {
      return ["To do"];
    }
  });
  const [newCardName, setNewCardName] = useState("");
  const [newCard, setNewCard] = useState(false);

  // Updates time every second and sets state accordingly. dateTime is used in the Clock.
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
    setNewCardName("");
    setNewCard(false);
  }

  return (
    <div
      data-theme="cinnamon-bun"
      className="h-full font-poppins min-h-screen
      bg-background dark:bg-dmBackground 
      text-onBackground dark:text-dmOnBackground/[87%]
      "
    >
      <div
        className="border-b-2
      border-b-onBackground/5 
      dark:border-b-dmOnBackground/5 
      "
      >
        <section
          id="header"
          className="px-10 py-4 w-full m-auto
          flex justify-between items-center
          "
        >
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-normal">
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
        </section>
      </div>

      <div className="mx-auto p-10 grid grid-cols-5 gap-3 w-full">
        {cardList.map((cardName) => (
          <List
            cardList={cardList}
            setCardList={setCardList}
            listName={cardName}
          />
        ))}
        {/* {cardList.length % 3 === 0 && <div></div>} */}
        <div className="mb-4">
          {newCard ? (
            <button
              className="hover:text-primary dark:hover:text-dmPrimary"
              onClick={() => setNewCard(false)}
            >
              <CancelX />
            </button>
          ) : (
            <button
              className="hover:text-primary dark:hover:text-dmPrimary"
              onClick={() => setNewCard(true)}
            >
              <SquaresPlus />
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
                <Plus />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
