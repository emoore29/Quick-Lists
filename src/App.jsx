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
    <div className="bg-[#93415c] h-full p-5">
      <div className="">
        <section id="header" className="mb-20">
          <h1 className="text-7xl text-black relative bottom-4">
            {day}, <span className="text-[2rem]">{dateString}</span>
          </h1>
          <h1 className="absolute top-0 right-0 text-3xl p-5 text-black">
            {dateTime.toLocaleTimeString()}
          </h1>
        </section>
      </div>
      <div>
        {newCard ? (
          <button onClick={() => setNewCard(false)}>
            <CancelX />
          </button>
        ) : (
          <button onClick={() => setNewCard(true)}>
            <SquaresPlus />
          </button>
        )}
      </div>
      {newCard && (
        <>
          <form onSubmit={addCard}>
            <input
              type="text"
              value={newCardName}
              onChange={(e) => setNewCardName(e.target.value)}
            ></input>
            <button type="submit">
              <Plus />
            </button>
          </form>
        </>
      )}
      <div className="m-auto grid grid-cols-3 gap-12 max-w-[1300px] ">
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
