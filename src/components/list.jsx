import { useState, useEffect } from "react";
import { KebabMenu, Star, Edit, Delete, CancelX, DoneSvg } from "./svgs";
import thisWeek from "../../json/this_week.json";
import { day } from "../utils/dates";

export default function List({
  listName,
  secondaryLists,
  setSecondaryLists,
  index,
}) {
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

  // Add today's work from this week's schedule to list items
  useEffect(() => {
    let stored = false;
    list.map((item) => {
      if (item.text.startsWith("MDPI") || item.text.startsWith("VIQ")) {
        stored = true;
      }
    });

    if (!stored && listName == "Today") {
      const mdpi = thisWeek[day]["mdpi"];

      const viqArr = [];
      // loop through day, add key (e.g. "five_day") and the associated value if there is one
      for (const [key, value] of Object.entries(thisWeek[day]["viq"])) {
        if (value) {
          let formattedKey;
          switch (key) {
            case "five_day":
              formattedKey = "five-day";
              break;
            case "two_day":
              formattedKey = "two-day";
              break;
            case "live_am":
              formattedKey = "live AM";
              break;
            case "live_pm":
              formattedKey = "live PM";
              break;
            default:
              formattedKey = key; // for other cases, keep the key as is
          }
          viqArr.push(`${value}h ${formattedKey} turnaround`);
        }
      }

      const workItems = [
        {
          text: `MDPI: ${mdpi}`,
          completed: false,
          edit: false,
          prioritise: false,
        },
        ...viqArr.map((workItem) => ({
          text: `VIQ: ${workItem}`,
          completed: false,
          edit: false,
          prioritise: false,
        })),
      ];

      setList([...list, ...workItems]);
    }
  }, [day, listName]);

  useEffect(() => {
    console.log("test");
  }, [day, listName]);

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

  // delete a card from view and local storage
  const deleteCard = () => {
    const newCardList = [...secondaryLists];
    newCardList.splice(index, 1); // Removes card from list based on index to avoid deleting cards with the same name
    setSecondaryLists(newCardList); // useEff in App.jsx will update the list in local storage after updating it here in state
    setIsMenuVisible(false);
    localStorage.removeItem(listName);
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
    <div
      className={`rounded-md relative pl-10 py-5 pr-5 break-inside-avoid
      ${
        listName !== "Today"
          ? "block min-w-full mb-5 bg-onSurface dark:bg-dmRaisedSurface text-left"
          : "min-w-[450px] bg-background dark:bg-dmSurface text-left"
      }
      min-h-min w-1/4 
      `}
    >
      <h2 className="text-left mb-2">{listName}</h2>
      <ul
        className={`mb-8 font-light ${
          listName === "Today" ? "text-xl" : "text-md"
        }`}
      >
        {list.map((item, index) => (
          <li
            key={index + item.text}
            className={`font-roboto relative text-primary dark:text-dmOnBackground text-left ${
              item.completed
                ? "text-onSurface dark:text-dmOnSurface opacity-[38%]"
                : ""
            }`}
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
                  listName !== "Today"
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
                  className={`absolute -left-5  ${
                    listName == "Today" ? "top-1.5" : "top-1"
                  }
                  border-1 rounded-md
            border-onSurface/[38%] dark:border-dmOnSurface/[38%]
            bg-background text-primary
            dark:bg-dmBackground dark:text-dmBackground
            `}
                  checked={item.completed}
                  onChange={() => handleComplete(index)}
                />{" "}
                <button
                  className={`text-left  ${
                    item.prioritise ? "text-secondary dark:text-dmPrimary" : ""
                  }`}
                  onClick={() => handleEdit(index)}
                >
                  <span className={item.completed ? "line-through" : ""}>
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
                  text-left bg-transparent`}
              type="text"
              value={listInput}
              placeholder="+"
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
              {listName !== "Today" && (
                <li className="p-1 w-full hover:text-primary dark:hover:text-dmPrimary">
                  <button
                    className="w-full text-left"
                    onClick={() => deleteCard(listName)}
                  >
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
    </div>
  );
}
