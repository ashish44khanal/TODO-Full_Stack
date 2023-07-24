// src/controllers/todoController.ts

import { Request, Response } from "express";
import * as todoService from "./Todo.service";

export const getAllTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  const todos = await todoService.getAllTodos();
  res.json(todos);
};

export const fetchAllTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const startDate = req.query.startDate
      ? new Date(req.query.startDate as string)
      : new Date(0);
    const endDate = req.query.endDate
      ? new Date(req.query.endDate as string)
      : new Date();

    const { todos, completedTasksAggregate } =
      await todoService.fetchAllTodosWithAggregate(startDate, endDate);

    res.json({ todos, completedTasksAggregate });
  } catch (error) {
    console.error("Error fetching TODOs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);
  const todo = await todoService.createTodo(req.body);
  res.json(todo);
};

export const getTodoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const todo = await todoService.getTodoById(id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const todo = await todoService.updateTodo(id, req.body);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  await todoService.deleteTodo(id);
  res.sendStatus(204);
};
