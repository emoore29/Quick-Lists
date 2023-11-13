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

    // reset values for adding a new card to default
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
        {cardList.map((cardName, index) => (
          <List
            key={cardName + index}
            index={index}
            cardList={cardList}
            setCardList={setCardList}
            listName={cardName}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
