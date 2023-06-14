import { useState, useEffect } from "react";

export default function List({ listName, cardList, setCardList }) {
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
    const updatedCardList = newCardList.filter((item) => item !== listName);
    setCardList(updatedCardList);
    localStorage.removeItem(listName);
  };

  // Reset all items in a list
  const resetList = () => {
    const newList = [...list];
    newList.map((item) => (item.completed = false));
    setList(newList);
  };

  // delete all list items
  const deleteAllListItems = () => {
    setList([]);
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
  };

  return (
    <section
      id="routine"
      className="p-5 text-left w-full min-w-[350px] bg-[#52c4ff]/25 rounded-md"
    >
      <div>
        <h1 className="text-black mb-2">{listName}</h1>
        <button
          className="text-center bg-[#c8839a] rounded-md border-none px-2 text-xs h-7"
          type="button"
          onClick={() => setUpdate(!update)}
        >
          {!update ? "Update" : "Finished updating"}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {update && (
          <div>
            <input
              className="bg-[#9ffff3] text-gray-800 rounded text-sm h-7"
              type="text"
              value={listInput}
              onChange={(e) => setListInput(e.target.value)}
            />
            <button
              type="submit"
              className="text-center bg-[#c8839a] rounded-full border-none px-2 ml-2 mr-2 mb-2 text-gray-800 h-7"
            >
              +
            </button>
          </div>
        )}
      </form>
      <ul className="mb-2">
        {list.map((item, index) => (
          <li
            key={index}
            className={`text-black ${item.completed && "line-through"}`}
          >
            <input
              type="checkbox"
              className="mr-2 bg-[#c8839a]-100 border-0 rounded-md text-[#9ffff3]-500 focus:ring-0 focus:ring-offset-0"
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
                <button type="submit">Submit</button>
              </form>
            )}
            {item.edit === false && item.text}
            {update && (
              <>
                <button className="ml-2" onClick={() => handleDelete(index)}>
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
                <button onClick={() => handleEdit(index)}>
                  {item.edit === false ? "Edit" : "Cancel Edit"}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      {listName !== "Await" &&
        listName !== "Routine" &&
        listName !== "To do" && <button onClick={deleteCard}>Delete</button>}
      <button onClick={resetList}>Reset all</button>
      <button onClick={deleteAllListItems}>Delete all</button>
      <button onClick={clearAllCompletedItems}>
        Clear all completed items
      </button>
    </section>
  );
}
