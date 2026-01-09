import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

interface Task {
  _id: string;
  text: string;
  completed: boolean;
}

export default function App() {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [inputTaskValue, setInputTaskValue] = useState("");

  const handleTaskAdd = async () => {
    try {
      const response = await axios.post('https://bookish-broccoli-qwqvrpggg5ghx7jx-5000.app.github.dev/api/tasks',
        {
          text: inputTaskValue
        } 
      );
      setInputTaskValue("");
      fetchTasks();
    }
    catch (error) {
    console.error("Error saving task:", error);
  }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://bookish-broccoli-qwqvrpggg5ghx7jx-5000.app.github.dev/api/tasks');
      setTaskData(response.data);
    }
    catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`https://bookish-broccoli-qwqvrpggg5ghx7jx-5000.app.github.dev/api/tasks/${taskId}`);
      fetchTasks();
    }
    catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [])

  return (
    <div id="container">
      <h1>Task App</h1>
      <div id="inputSection">
        <input 
          type="text" 
          id="taskInput" 
          placeholder="Enter the new task"
          value={inputTaskValue} 
          onChange={(e) => setInputTaskValue(e.target.value)} 
        />
        <button onClick={handleTaskAdd} style={{ marginLeft: "10px" }}>Add Task</button>
      </div>
      <div id="taskList">
        <h3>Task List</h3>
        {taskData.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
        <ol>
          {taskData.map((task) => (
            <li key={task._id} style={{ marginBottom: "10px" }}>
              <span>{task.text}</span>
              <button style={{ marginLeft: "10px", color: "red"}} onClick={() => handleDeleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ol>
        )}
      </div>
    </div>
  );
}