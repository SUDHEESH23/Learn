import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import './App.css';

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const { taskData, loading, addNewTask, removeTask, editTask } = useTasks();

  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskText, setEditTaskText] = useState("");

  const handleEditClick = (task: any) => {
    setEditTaskId(task._id);
    setEditTaskText(task.text);
  }

  const handleSaveEdit = async (id: string) => {
    await editTask(id, editTaskText);
    setEditTaskId(null);
  }

  const handleAdd = async () => {
    if (!inputValue.trim()) return;
    await addNewTask(inputValue);
    setInputValue("");
  };

  return (
    <div id="container">
      <h1>Task App</h1>
      <div id="inputSection">
        <input 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="New task..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div id="taskList">
      <h2>Tasks</h2>
      {loading ? <p>Loading...</p> : (
        <ul>
          {taskData.map(task => (
            <li key={task._id}>
              {editTaskId === task._id ? (
                <>
                  <input 
                    value={editTaskText} 
                    onChange={(e) => setEditTaskText(e.target.value)} 
                  />
                  <button onClick={() => handleSaveEdit(task._id)}>Save</button>
                  <button onClick={() => setEditTaskId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{task.text}</span>
                  <button onClick={() => handleEditClick(task)}>Edit</button>
                  <button onClick={() => removeTask(task._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}