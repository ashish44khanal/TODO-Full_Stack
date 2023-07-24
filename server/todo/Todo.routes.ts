// src/routes/todoRoutes.ts

import { Router } from "express";
import * as TodoController from "./Todo.controller";

const router = Router();

router.get("/todos", TodoController.fetchAllTodos);
router.post("/todos", TodoController.createTodo);
router.get("/todos/:id", TodoController.getTodoById);
router.patch("/todos/:id", TodoController.updateTodo);
router.delete("/todos/:id", TodoController.deleteTodo);

export default router;
