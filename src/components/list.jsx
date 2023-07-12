import { useState, useEffect } from "react";
import { KebabMenu, DoneSvg, EditSvg, Plus } from "./svgs";
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
  const [update, setUpdate] = useState(false);
  // inputValue is a new item in the list
  const [listInput, setListInput] = useState("");
  const [updateItem, setUpdateItem] = useState("");
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [itemHoverIndex, setItemHoverIndex] = useState(false);

  // Adds new item to list
  const handleSubmit = (e) => {
    e.preventDefault();
    setList([...list, { text: listInput, completed: false, edit: false }]);
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
    newList[index].text = updateItem;
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
      className="relative p-5 text-left min-h-[350px] w-full
      text-lg 
      border-solid rounded-lg border-2
      border-onBackground/5 dark:border-dmOnBackground/5
      bg-surface dark:bg-dmSurface
      hover:shadow-lightSm dark:hover:shadow-darkSm"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="flex items-center gap-2 mb-4 
      text-onSurface dark:text-dmOnSurface"
      >
        <h1 className="font-normal opacity-[87%]">{listName}</h1>
        {hover && (
          <button
            className="hover:text-primary dark:hover:text-dmPrimary"
            type="button"
            onClick={() => setUpdate(!update)}
          >
            {!update ? <EditSvg /> : <DoneSvg />}
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        {update && (
          <div className="flex justify-center mb-4">
            <input
              className="rounded h-7 dark:text-onBackground"
              type="text"
              value={listInput}
              onChange={(e) => setListInput(e.target.value)}
            />
            <button
              className="hover:text-primary dark:hover:text-dmPrimary"
              type="submit"
            >
              <Plus />
            </button>
          </div>
        )}
      </form>
      <ul className="mb-8 font-light text-sm  opacity-[87%]">
        {list.map((item, index) => (
          <li
            key={index}
            className={`p-[0.1rem] font-roboto ${
              item.completed &&
              "line-through text-onSurface dark:text-dmOnSurface opacity-[38%]"
            }`}
            onMouseEnter={() => setItemHoverIndex(index)}
            onMouseLeave={() => setItemHoverIndex(null)}
          >
            <input
              type="checkbox"
              className="mr-2 border-1 rounded-md
              border-onSurface/[38%] dark:border-dmOnSurface/[38%]
              bg-background text-primary
              dark:bg-dmBackground dark:text-dmBackground
              focus:ring-1 focus:ring-offset-1
              focus:ring-primary dark:focus:ring-dmPrimary
              focus:ring-offset-background 
              dark:focus:ring-offset-dmBackground"
              checked={item.completed}
              onChange={() => handleComplete(index)}
            />
            {item.edit === true && (
              <form onSubmit={(e) => handleUpdate(e, index)}>
                <input
                  type="text"
                  defaultValue={item.text}
                  onChange={(e) => setUpdateItem(e.target.value)}
                />
                <button
                  className="hover:text-accent dark:hover:text-light"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}
            {item.edit === false && <span>{item.text}</span>}
            {itemHoverIndex === index && (
              <>
                <button
                  className="ml-2 hover:text-accent"
                  onClick={() => handleDelete(index)}
                >
                  <div className="h-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 -4 26 26"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-auto h-full"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </button>
                <button
                  className="hover:text-accent"
                  onClick={() => handleEdit(index)}
                >
                  {item.edit === false ? "Edit" : "Cancel Edit"}
                </button>
              </>
            )}
          </li>
        ))}
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
              <li className="p-1 w-full hover:text-primary dark:hover:text-dmPrimary">
                <button className="w-full text-left" onClick={deleteCard}>
                  <span className="opacity-[87%]">Delete card</span>
                </button>
              </li>

              <li className="p-1 w-full hover:text-primary dark:hover:text-dmPrimary">
                <button className="w-full text-left" onClick={resetList}>
                  <span className="opacity-[87%]">Uncheck all</span>
                </button>
              </li>
              <li className="p-1 w-full hover:text-primary dark:hover:text-dmPrimary">
                <button
                  className="w-full text-left"
                  onClick={deleteAllListItems}
                >
                  <span className="opacity-[87%]">Delete all</span>
                </button>
              </li>
              <li className="p-1 w-full hover:text-primary dark:hover:text-dmPrimary">
                <button
                  className="w-full text-left"
                  onClick={clearAllCompletedItems}
                >
                  <span className="opacity-[87%]">
                    Clear all completed items
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
