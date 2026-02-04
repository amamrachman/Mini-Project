import { ApiTodo, Todo } from "@/types/Todo";
import { apiFetch } from "./auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const mapTodoFromApi = (apiTodo: ApiTodo) => ({
  id: String(apiTodo.id),
  judul: apiTodo.judul,
  complete: apiTodo.is_completed,
  create_at: new Date(apiTodo.created_at),
});

export const getTodosApi = async () => {
  const res = await apiFetch(`${API_BASE_URL}/api/todos`, { method: "GET" });
  return res.data.map(mapTodoFromApi);
};

export const createTodoApi = async (judul: string) => {
  const res = await apiFetch(`${API_BASE_URL}/api/todos`, {
    method: "POST",
    body: { judul },
  });
  return mapTodoFromApi(res.data);
};

export const updateTodoApi = async (id: string, updates: Partial<Todo>) => {
  const res = await apiFetch(`${API_BASE_URL}/api/todos/${id}`, {
    method: "PUT",
    body: updates,
  });
  return mapTodoFromApi(res.data);
};

export const deleteTodoApi = async (id: string) => {
  await apiFetch(`${API_BASE_URL}/api/todos/${id}`, { method: "DELETE" });
};

export const syncTodos = async (todos: Todo[]) => {
  await apiFetch(`${API_BASE_URL}/api/todos/sync`, {
    method: "POST",
    body: { todos },
  });
};