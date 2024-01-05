import { useState, useEffect } from "react";
import { KebabMenu, Star, Edit, Delete, CancelX, DoneSvg } from "./svgs";
export default function List({ listName, cardList, setCardList, index }) {
  // If there are items saved in local storage, sets list to the saved list, otherwise list is empty by default
  const [list, setList] = useState(() => {
    const savedList = localStorage.getItem(listName);
    if (savedList) {
      return JSON.parse(savedList);
    } else {
      return [];
    }
  });
  // inputValue is a new item in the list
  const [listInput, setListInput] = useState("");
  const [updateItem, setUpdateItem] = useState(""); // string from an item in the list, set whenever user changes item
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [itemHoverIndex, setItemHoverIndex] = useState(false);

  // Adds new item to list
  const handleSubmit = (e) => {
    e.preventDefault();
    setList([
      ...list,
      { text: listInput, completed: false, edit: false, prioritise: false },
    ]);
    setListInput("");
  };

  // Saves list to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(listName, JSON.stringify(list));
  }, [list]);

  // Removes item from list
  const handleDelete = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
    setIsMenuVisible(false);
  };

  // Tick and cross off list item
  const handleComplete = (index) => {
    const newList = [...list];
    newList[index].completed = !newList[index].completed;
    setList(newList);
  };

  // Mark item as a priority (for highlighting)
  const handlePrioritise = (index) => {
    const newList = [...list];
    newList[index].prioritise = !newList[index].prioritise;
    setList(newList);
  };

  // delete a card + the corresponding list
  const deleteCard = () => {
    const newCardList = [...cardList];
    newCardList.splice(index, 1); // Removes card from list based on index to avoid deleting cards with the same name
    setCardList(newCardList); // useEff in App.jsx will update the list in local storage after updating it here in state
    setIsMenuVisible(false);

    // const updatedCardList = newCardList.filter((item) => item !== listName);
    // localStorage.removeItem(listName);
  };

  // Reset all items in a list
  const resetList = () => {
    const newList = [...list];
    newList.map((item) => (item.completed = false));
    setList(newList);
    setIsMenuVisible(false);
  };

  // delete all list items
  const deleteAllListItems = () => {
    setList([]);
    setIsMenuVisible(false);
  };

  // edit a specific item in the list
  const handleEdit = (index) => {
    const newList = [...list];
    newList[index].edit = !newList[index].edit;
    setList(newList);
  };

  // updates list based on new item
  const handleUpdate = (e, index) => {
    e.preventDefault();
    const newList = [...list];
    newList[index].text = updateItem !== "" ? updateItem : newList[index].text;
    newList[index].edit = false;
    setUpdateItem("");
    setList(newList);
  };

  // clears all completed items
  const clearAllCompletedItems = () => {
    const newList = [...list];
    const nonCompletedItemList = newList.filter((item) => !item.completed);
    setList(nonCompletedItemList);
    setIsMenuVisible(false);
  };

  return (
    <section
      id="list"
      className={`relative p-5
      ${
        listName !== "Primary"
          ? "min-w-full bg-surface dark:bg-dmRaisedSurface text-left"
          : "min-w-[350px] bg-background dark:bg-dmBackground text-left"
      }
      min-h-min w-1/4
      `}
    >
      <h1 className="text-left mb-2">{listName !== "Primary" && listName}</h1>
      <ul
        className={`mb-8 font-light ${
          listName === "Primary" ? "text-2xl" : "text-md"
        }`}
      >
        {list.map((item, index) => (
          <li
            key={index + item.text}
            className={`font-roboto relative text-primary dark:text-dmOnBackground ${
              item.completed &&
              "text-onSurface dark:text-dmOnSurface opacity-[38%] "
            }`}
            onMouseEnter={() => setItemHoverIndex(index)}
            onMouseLeave={() => setItemHoverIndex(null)}
          >
            {item.edit === true ? (
              <form onSubmit={(e) => handleUpdate(e, index)}>
                <input
                  className={`rounded h-7 focus:outline-none
                  border-none focus:ring-1
              focus:ring-primary dark:focus:ring-dmPrimary
              focus:ring-offset-background 
              dark:focus:ring-offset-dmBackground
                text-onSurface 
               dark:text-dmOnSurface
                font-roboto font-light ${
                  listName !== "Primary"
                    ? "text-left dark:bg-dmRaisedSurface bg-surface"
                    : "text-left dark:bg-dmBackground bg-background"
                }`}
                  type="text"
                  defaultValue={item.text}
                  onChange={(e) => setUpdateItem(e.target.value)}
                />
                <button
                  className="hover:text-primary dark:hover:text-dmPrimary"
                  type="submit"
                >
                  <DoneSvg />
                </button>
                <button
                  className="hover:text-primary dark:hover:text-dmPrimary"
                  onClick={() => handleEdit(index)}
                >
                  <CancelX />
                </button>
                <button
                  className="ml-2 hover:text-primary dark:hover:text-dmPrimary"
                  onClick={() => handleDelete(index)}
                >
                  <Delete />
                </button>
                <button
                  className="hover:text-primary dark:hover:text-dmPrimary"
                  onClick={() => handlePrioritise(index)}
                >
                  <Star />
                </button>
              </form>
            ) : (
              <>
                <input
                  type="checkbox"
                  className="border-1 rounded-md
            border-onSurface/[38%] dark:border-dmOnSurface/[38%]
            bg-background text-primary
            dark:bg-dmBackground dark:text-dmBackground
            "
                  checked={item.completed}
                  onChange={() => handleComplete(index)}
                />{" "}
                <button
                  className={
                    item.prioritise && "text-secondary dark:text-dmPrimary"
                  }
                  onClick={() => handleEdit(index)}
                >
                  <span className={item.completed && "line-through"}>
                    {item.text}
                  </span>
                </button>
              </>
            )}
          </li>
        ))}
        <li>
          <form onSubmit={handleSubmit}>
            <input
              className={`rounded border-none
                p-0 w-auto
                 h-7 
                  text-onSurface 
                   dark:text-dmOnSurface
                  font-roboto font-light
                  ${
                    listName !== "Primary"
                      ? "text-left dark:bg-dmRaisedSurface bg-surface"
                      : "text-left dark:bg-dmBackground bg-background"
                  }`}
              type="text"
              value={listInput}
              placeholder="Click to add item"
              onChange={(e) => setListInput(e.target.value)}
            />
          </form>
        </li>
      </ul>
      <div id="menu" className="absolute bottom-5 right-5 text-sm">
        {isMenuVisible && (
          <div
            className="absolute bottom-8 right-2 p-4 rounded-md
            w-56
          bg-background shadow-lightSm 
          dark:text-dmOnSurface dark:bg-dmRaisedSurface"
          >
            <ul>
              {listName !== "Primary" && (
                <li className="p-1 w-full hover:text-primary dark:hover:text-dmPrimary">
                  <button className="w-full text-left" onClick={deleteCard}>
                    <span className="opacity-[87%]">Delete card</span>
                  </button>
                </li>
              )}
              <li className="p-1 w-full hover:text-primary dark:hover:text-dmPrimary">
                <button className="w-full text-left" onClick={resetList}>
                  <span className="opacity-[87%]">Uncheck all items</span>
                </button>
              </li>
              <li className="p-1 w-full hover:text-primary dark:hover:text-dmPrimary">
                <button
                  className="w-full text-left"
                  onClick={deleteAllListItems}
                >
                  <span className="opacity-[87%]">Delete all items</span>
                </button>
              </li>
              <li className="p-1 w-full hover:text-primary dark:hover:text-dmPrimary">
                <button
                  className="w-full text-left"
                  onClick={clearAllCompletedItems}
                >
                  <span className="opacity-[87%]">
                    Delete all completed items
                  </span>
                </button>
              </li>
            </ul>
          </div>
        )}
        <button
          id="kebab-menu"
          onClick={() => setIsMenuVisible(!isMenuVisible)}
          className="hover:text-primary dark:hover:text-dmPrimary"
        >
          <KebabMenu />
        </button>
      </div>
    </section>
  );
}
