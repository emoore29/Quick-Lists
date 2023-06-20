import { useState, useEffect } from "react";
import { SquaresPlus, Plus, CancelX } from "./components/svgs";
import "./App.css";

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
      return ["Await", "Routine", "To do"];
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
    <div className="bg-brand-white dark:bg-main-brand h-full p-12 text-main-brand dark:text-light-shade font-lateef min-h-screen">
      <div className="">
        <section id="header" className="mb-4">
          <h1 className="text-4xl relative bottom-4">
            {day}, <span className="text-4xl">{dateString}</span>
          </h1>
          <h1 className="absolute top-0 right-0 text-xl p-5">
            {dateTime.toLocaleTimeString()}
          </h1>
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
