import { useState, useEffect } from "react";

export default function Routine() {
  const [routine, setRoutine] = useState(() => {
    const savedRoutine = localStorage.getItem("routine");
    if (savedRoutine) {
      return JSON.parse(savedRoutine);
    } else {
      return [];
    }
  });
  const [updateRoutine, setUpdateRoutine] = useState(false);
  const [routineInput, setRoutineInput] = useState("");
  
  // Adds new item to list
  const handleSubmit = (e) => {
    e.preventDefault();
    setRoutine([...routine, { text: routineInput, completed: false }]);
    setRoutineInput("");
  };
  
  
    // Saves list to local storage whenever it changes
    useEffect(() => {
      localStorage.setItem("routine", JSON.stringify(routine));
    }, [routine]);

  
    // Removes item from list
    const handleDelete = (index) => {
      const newRoutine = [...routine];
      newRoutine.splice(index, 1);
      setRoutine(newRoutine);
    };
    
    // Tick and cross off item
    const handleComplete = (index) => {
      
      const newRoutine = [...routine];
      newRoutine[index].completed = !newRoutine[index].completed;
      setRoutine(newRoutine);
    };
    
    
  
      return (
          <section id="routine" className="justify-self-end col-start-3 text-left p-5 max-w-xs w-xs min-w-[350px] bg-[#ffddf4]/25 rounded-md">
          <h1 className="text-black mb-2">Daily Routine:</h1>
          <ul className="mb-3">
            {routine.map((item, index) => (
              <li
                key={index}
                className={`text-black ${
                  item.completed && "line-through"
                } break-words`}
                
              >
                <input
                  type="checkbox"
                  className="mr-2 bg-[#c8839a]-100 border-0 rounded-md text-[#9ffff3]-500 focus:ring-0 focus:ring-offset-0"
                  checked={item.completed}
                  onChange={() => handleComplete(index)}
                />
                {item.text}
{updateRoutine && <button className="ml-2" onClick={() => handleDelete(index)}>
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
                </button>}
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <button className="text-center bg-[#c8839a] rounded-md border-none px-2 text-xs h-7" type="button" onClick={() => setUpdateRoutine(!updateRoutine)}>{!updateRoutine ? "Update" : "Finished updating"}</button>
             {updateRoutine && 
             <div>
             <input
             
              className="bg-[#9ffff3] text-gray-800 rounded text-sm h-7"
              type="text"
              value={routineInput}
              onChange={(e) => setRoutineInput(e.target.value)}
            />
            <button
              type="submit"
              className="text-center bg-[#c8839a] rounded-full border-none px-2 ml-2 mr-2 mb-2 text-gray-800 h-7"
            >
              +
            </button></div>}
          </form>
        </section>
      )
}