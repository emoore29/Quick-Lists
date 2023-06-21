import { useState, useEffect } from "react";
import { SquaresPlus, Plus, CancelX } from "./components/svgs";
import "./App.css";
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
      return ["Routine", "To do", "Await"];
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
    <div className="bg-brand-white dark:bg-dark-shade h-full p-16 text-main-brand dark:text-light-shade font-poppins min-h-screen">
      <div className="">
        <section
          id="header"
          className="mb-24 flex justify-between items-center"
        >
          <h1 className="text-4xl font-normal">
            <span className="text-medium-shade">{day}</span>
            <span className="text-4xl"> {dateString}</span>
          </h1>
          <div className="flex items-center">
            {/* <ThemeSwitch /> */}
            <h1 className="">{dateTime.toLocaleTimeString()}</h1>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-4 gap-12 max-w-[90%] mb-12">
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
              className="hover:text-medium-shade"
              onClick={() => setNewCard(false)}
            >
              <CancelX />
            </button>
          ) : (
            <button
              className="hover:text-medium-shade"
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
              <button className="hover:text-medium-shade" type="submit">
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
