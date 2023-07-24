import { useEffect, useState } from "react";
import "./App.css";
import todoService, { Todo } from "./services/TodoService";

function App() {
  const [date, setDate] = useState<Date>();
  const [dateFilter, setDateFilter] = useState({
    startDate: new Date().toString(),
    endDate: new Date().toString(),
  });
  const [completedTodoAggregate, setCompletedTodoAggregate] =
    useState<number>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

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

  const handleCreateTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Custom validation for empty submission
      if (!newTodoTitle.trim()) {
        setValidationError("Please enter a task title.");
        return;
      }
      const body = {
        title: newTodoTitle,
      };
      const createdTodo = await todoService.createTodo(body);
      setTodos([...todos, createdTodo]);
      setNewTodoTitle("");
      setValidationError("");
    } catch (error: any) {
      setValidationError(error.message);
    }
  };

  const handleTodoTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewTodoTitle(event.target.value);
  };

  const fetchTodos = async (startDate: string, endDate: string) => {
    const res = await todoService.getAllTodos(startDate, endDate);
    setTodos(res.todos);
    setCompletedTodoAggregate(res.completedTasksAggregate);
  };

  const handleTodoCompletionToggle = async (id: string, completed: boolean) => {
    try {
      // Call the update service method to toggle the completion status
      const updatedTodo = await todoService.updateTodo(id, {
        completed: !completed,
      });
      if (updatedTodo.completed === true) {
        setCompletedTodoAggregate(completedTodoAggregate! + 1);
      } else {
        setCompletedTodoAggregate(completedTodoAggregate! - 1);
      }

      // Update the TODO in the state with the response from the server
      const updatedTodos = todos.map((todo) =>
        todo._id === updatedTodo._id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating TODO:", error);
    }
  };

  useEffect(() => {
    setDate(new Date());
    fetchTodos(dateFilter.startDate, dateFilter.endDate);
  }, []);
  return (
    <div className="bg-gray-700 bg-opacity-95 w-full h-screen">
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
              <h1 className="text-2xl font-semibold">
                {todos.length > 0 &&
                  (
                    (Number(completedTodoAggregate) / todos.length) *
                    100
                  ).toFixed(2)}{" "}
                %
              </h1>
              <p className="text-xs">Completed</p>
            </div>
          </div>
          <hr className="my-4  border-gray-600 bg-red-500" />
          <form onSubmit={handleCreateTodo}>
            <input
              type="text"
              value={newTodoTitle}
              onChange={handleTodoTitleChange}
              className="w-full bg-gray-800 bg-opacity-40 h-12 rounded-lg shadow-md px-4"
              placeholder="Add a task..."
            />
            {validationError && (
              <p className="text-red-500 mt-2">{validationError}</p>
            )}
          </form>
          <div className="my-8">
            {todos.map((item, i) => (
              <div className="flex items-center space-x-4 mb-3" key={i}>
                <input
                  type="checkbox"
                  name=""
                  id={item._id}
                  checked={item.completed}
                  onChange={() =>
                    handleTodoCompletionToggle(item._id, item.completed)
                  }
                />
                <label
                  className={
                    item.completed
                      ? "line-through"
                      : "" + "font-sans cursor-pointer capitalize"
                  }
                  htmlFor={item._id}
                >
                  {item.title}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
