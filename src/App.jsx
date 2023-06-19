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
    <div className="bg-light-shade h-full p-5 text-dark-shade">
      <div className="">
        <section id="header" className="mb-4">
          <h1 className="text-3xl relative bottom-4">
            {day}, <span className="text-3xl">{dateString}</span>
          </h1>
          <h1 className="absolute top-0 right-0 text-xl p-5">
            {dateTime.toLocaleTimeString()}
          </h1>
        </section>
      </div>
      <div className="mb-4">
        {newCard ? (
          <button
            className="hover:text-dark-accent"
            onClick={() => setNewCard(false)}
          >
            <CancelX />
          </button>
        ) : (
          <button
            className="hover:text-dark-accent"
            onClick={() => setNewCard(true)}
          >
            <SquaresPlus />
          </button>
        )}
      </div>
      {newCard && (
        <form onSubmit={addCard} className="mb-4">
          <input
            type="text"
            className=" text-sm"
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
          ></input>
          <button className="hover:text-dark-accent" type="submit">
            <Plus />
          </button>
        </form>
      )}
      <div className="mx-auto grid grid-cols-3 gap-12 max-w-[1300px] mb-12">
        {cardList.map((cardName) => (
          <List
            cardList={cardList}
            setCardList={setCardList}
            listName={cardName}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
