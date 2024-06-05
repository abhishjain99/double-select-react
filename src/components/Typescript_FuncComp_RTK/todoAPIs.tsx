import { Todo } from './todoInterfaces';

const baseURL = "http://localhost:3000/todos";

export const getTodos = async (): Promise<Todo[]> => {
  return fetch(baseURL).then((res) => res.json());
};

export const createTodo = async (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
  return fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTodo)
  }).then((res) => res.json());
};

export const updateTodo = async (id: string, partialTodo: Omit<Todo, 'id'>): Promise<Todo[]> => {
  return fetch(baseURL + `/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(partialTodo)
  }).then((res) => res.json());
};

export const deleteTodo = async (id: string): Promise<Todo[]> => {
  return fetch(`${baseURL}/${id}`, {method: "DELETE"}).then((res) => res.json());
};
