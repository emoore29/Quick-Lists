import { CancelX } from "./svgs";
import { useState, useEffect } from "react";
import List from "./list";

export default function SecondaryLists({
  areSecondaryListsVisible,
  setAreSecondaryListsVisible,
}) {
  const [secondaryLists, setSecondaryLists] = useState(() => {
    const savedList = localStorage.getItem("Secondary Lists");
    if (savedList) {
      return JSON.parse(savedList);
    } else {
      return null;
    }
  });
  const [newCardName, setNewCardName] = useState("");
  const [newCard, setNewCard] = useState(false);

  // Saves secondary lists to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("Secondary Lists", JSON.stringify(secondaryLists));
  }, [secondaryLists]);

  function closeSecondaryLists() {
    setAreSecondaryListsVisible(false);
  }

  function addList(e) {
    e.preventDefault();
    const newCardList = secondaryLists ? [...secondaryLists] : [];
    newCardList.push(newCardName);
    setSecondaryLists(newCardList);

    // reset values for adding a new card to default
    setNewCardName("");
    setNewCard(false);
  }

  return (
    <section
      id="secondaryLists"
      className={`${
        areSecondaryListsVisible ? "" : "hidden"
      } overflow-auto fixed top-0 left-0 flex flex-col bg-surface dark:bg-dmRaisedSurface p-10 h-full w-1/4 min-w-min`}
    >
      <h2>Secondary Lists</h2>{" "}
      <button
        onClick={closeSecondaryLists}
        aria-label="Close secondary tasks"
        className="absolute top-0 right-0 m-5"
      >
        <CancelX />
      </button>
      {secondaryLists &&
        secondaryLists.map(
          (cardName, index) =>
            cardName !== "Today" && (
              <List
                key={cardName + index}
                index={index}
                secondaryLists={secondaryLists}
                setSecondaryLists={setSecondaryLists}
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
          <form onSubmit={addList} className="mb-4">
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
  );
}
