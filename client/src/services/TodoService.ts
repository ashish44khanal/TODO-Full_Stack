import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

interface TodoWithAggregate {
  todos: Todo[];
  completedTasksAggregate: number;
}

class TodoService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
    });
  }

  async getAllTodos(
    startDate: string,
    endDate: string
  ): Promise<TodoWithAggregate> {
    const response: AxiosResponse<TodoWithAggregate> = await this.api.get(
      `/todos?start_date=${startDate}&end_date=${endDate}`
    );
    return response.data;
  }

  async createTodo(todo: { title: string }): Promise<Todo> {
    const response: AxiosResponse<Todo> = await this.api.post("/todos", todo);
    return response.data;
  }

  async updateTodo(id: string, todo: { completed: boolean }): Promise<Todo> {
    const response: AxiosResponse<Todo> = await this.api.patch(
      `/todos/${id}`,
      todo
    );
    return response.data;
  }

  async deleteTodo(id: string): Promise<void> {
    await this.api.delete(`/todos/${id}`);
  }
}

const baseURL = "http://localhost:5000/api"; // Replace this with your backend API endpoint
const todoService = new TodoService(baseURL);

export default todoService;
