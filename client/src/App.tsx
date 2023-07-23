import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [date, setDate] = useState<Date>();

  function getDay(day: number): string {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    if (day < 0 || day > 6) {
      throw new Error("Invalid input. Day must be a number between 0 and 6.");
    }

    return daysOfWeek[day];
  }

  function formatDate(date: Date): string {
    // Define options for formatting the date
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };

    // Format the date as "Jul 10 2023"
    const formattedDate: string = date.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  const taskList = [
    {
      date: "sd",
      isTaskCompleted: true,
      task: "TO wash dishes",
    },
    {
      date: "sd",
      isTaskCompleted: false,
      task: "TO complete coding task ",
    },
    {
      date: "sd",
      isTaskCompleted: false,
      task: "TO read book",
    },
  ];
  useEffect(() => {
    setDate(new Date());
  }, []);
  return (
    <div className="bg-pink-400 w-full h-screen">
      <div className="grid place-items-center h-full">
        <div className="bg-gray-700 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3 mx-auto text-white p-8 ">
          <div className="flex items-center justify-between">
            {/* header section -- Day & progress  */}
            {date && (
              <section>
                <h1 className="text-3xl font-bold">{getDay(date.getDay())}</h1>
                <p className="mt-2">{formatDate(date)}</p>
              </section>
            )}
            {/* progress bar  */}
            <div className="">
              <h1 className="text-2xl font-semibold">24 %</h1>
              <p className="text-xs">Completed</p>
            </div>
          </div>
          <hr className="my-4  border-gray-600 bg-red-500" />
          <form action="">
            <input
              type="text"
              name=""
              id=""
              className="w-full bg-gray-800 bg-opacity-40 h-12 rounded-lg shadow-md px-4"
              placeholder="Add a task..."
            />
          </form>
          <div className="my-8">
            {taskList.map((item, i) => (
              <div className="flex items-center space-x-4 mb-3" key={i}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={item.isTaskCompleted}
                />
                <p className="font-sans">{item.task}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
