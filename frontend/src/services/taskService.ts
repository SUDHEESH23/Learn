import axios from "axios";
import type { Task } from "../types/task";

const BASE_URL = 'https://bookish-broccoli-qwqvrpggg5ghx7jx-5000.app.github.dev/api/tasks';

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    const response = await axios.get(BASE_URL);
    return response.data;
  },
  addTask: async (text: string): Promise<Task> => {
    const response = await axios.post(BASE_URL, { text });
    return response.data;
  },
  deleteTask: async (taskId: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/${taskId}`);
  },
  updateTask: async (taskId: string, newText: string): Promise<Task> => {
  const response = await axios.put(`${BASE_URL}/${taskId}`, { text: newText });
  return response.data;
  },
  updateStatus: async (taskId: string, completed: boolean): Promise<Task> => {
    return axios.patch(`${BASE_URL}/${taskId}`, { completed });
  }
  };