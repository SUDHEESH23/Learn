import { useState, useEffect } from "react";
import type { Task } from "../types/task";
import { taskService } from "../services/taskService";

export const useTasks = () => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadTasks = async () => {
    try {
      const data = await taskService.getTasks();
      setTaskData(data);
    } finally {
      setLoading(false);
    }
  };

  const addNewTask = async (text: string) => {
    await taskService.addTask(text);
    await loadTasks(); // Refresh list
  };

  const removeTask = async (id: string) => {
    await taskService.deleteTask(id);
    await loadTasks(); // Refresh list
  };

  const editTask = async (id: string, newText: string) => {
  try {
    await taskService.updateTask(id, newText);
    await loadTasks(); // Refresh the list after editing
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

  const toggleTaskStatus = async (id: string, completed: boolean) => {
    try {
      await taskService.updateStatus(id, !completed);
      await loadTasks();
    }
    catch (error) {
      console.error("Error toggling task status:", error);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return { taskData, loading, addNewTask, removeTask, editTask, toggleTaskStatus };
};