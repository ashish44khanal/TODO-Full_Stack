// src/models/Todo.ts

import { Schema, model } from "mongoose";

interface Todo {
  title: string;
  completed: boolean;
}

const todoSchema = new Schema<Todo>(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default model<Todo>("Todo", todoSchema);
