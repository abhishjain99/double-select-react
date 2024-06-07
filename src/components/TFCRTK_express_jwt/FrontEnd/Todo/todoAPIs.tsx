import { Todo } from './todoInterfaces';

const baseURL = "http://localhost:3000/todos";

const getAuthHeader = () => ({
  'Content-Type': 'application/json',
  'authorization': localStorage.getItem('token') || ''
});

export const getTodos = async (): Promise<Todo[]> => {
  return fetch(baseURL, {
    headers: getAuthHeader()
  }).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch todos');
    return res.json();
  });
};

export const createTodo = async (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
  return fetch(baseURL, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify(newTodo)
  }).then((res) => {
    if (!res.ok) throw new Error('Failed to create todos');
    return res.json();
  });
};

export const updateTodo = async (id: string, partialTodo: Omit<Todo, 'id'>): Promise<Todo[]> => {
  return fetch(baseURL + `/${id}`, {
    method: "PATCH",
    headers: getAuthHeader(),
    body: JSON.stringify(partialTodo)
  }).then((res) => {
    if (!res.ok) throw new Error('Failed to update todos');
    return res.json();
  });
};

export const deleteTodo = async (id: string): Promise<Todo[]> => {
  return fetch(`${baseURL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeader()
  }).then((res) => {
    if (!res.ok) throw new Error('Failed to delete todos');
    return res.json();
  });
};
