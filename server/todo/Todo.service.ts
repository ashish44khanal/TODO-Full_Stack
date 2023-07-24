// src/services/todoService.ts

import TodoModel from "./model/Todo";

interface Todo {
  title: string;
  completed: boolean;
}

export const getAllTodos = async (): Promise<Todo[]> => {
  return TodoModel.find();
};

export const createTodo = async (todo: Todo): Promise<Todo> => {
  return TodoModel.create(todo);
};

export const getTodoById = async (id: string): Promise<Todo | null> => {
  return TodoModel.findById(id);
};

export const updateTodo = async (
  id: string,
  todo: Todo
): Promise<Todo | null> => {
  return TodoModel.findByIdAndUpdate(id, todo, { new: true });
};

export const deleteTodo = async (id: string): Promise<void> => {
  await TodoModel.findByIdAndDelete(id);
};

export const getCompletedTasksAggregate = async (
  startDate: Date,
  endDate: Date
): Promise<any[]> => {
  return TodoModel.aggregate([
    {
      $match: {
        completed: true,
        createdAt: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $group: {
        _id: null,
        completedTasksCount: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        completedTasksCount: 1,
      },
    },
  ]);
};

export const fetchAllTodosWithAggregate = async (
  startDate: Date,
  endDate: Date
): Promise<{ todos: Todo[]; completedTasksAggregate: number }> => {
  const todos = await TodoModel.find({
    createdAt: { $gte: startDate, $lt: endDate },
  });
  const completedTasksNumber = await getCompletedTasksAggregate(
    startDate,
    endDate
  );

  const aggregate = Number(completedTasksNumber[0].completedTasksCount);
  return { todos, completedTasksAggregate: +aggregate };
};
