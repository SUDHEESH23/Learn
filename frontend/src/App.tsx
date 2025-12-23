import { useState } from "react";
import './App.css';

export default function App() {
  const [taskData, setTaskData] = useState<string[]>([]);
  const [inputTaskValue, setInputTaskValue] = useState("");

  // FIX 1: Specify that editIndex can be a number OR null
  const [editIndex, setEditIndex] = useState<number | null>(null); 
  const [editText, setEditText] = useState("");

  // FIX 2: Only one handleTaskAdd function
  const handleTaskAdd = () => {
    if (inputTaskValue.trim()) {
      setTaskData([...taskData, inputTaskValue]);
      setInputTaskValue("");
    }
  };

  const handleTaskDelete = (index: number) => {
    setTaskData(taskData.filter((_, i) => i != index));
  }

  const startEdit = (index: number) => {
    setEditIndex(index);
    setEditText(taskData[index]);
  };

  const saveEdit = (index: number) => {
    const updatedList = [...taskData];
    updatedList[index] = editText;
    setTaskData(updatedList);
    setEditIndex(null);
  };


  return (
    <div id="container">
      <h1>Task App</h1>
      <label htmlFor="taskInput">New Task: </label>
      <input 
        type="text" 
        id="taskInput" 
        value={inputTaskValue} 
        onChange={(e) => setInputTaskValue(e.target.value)} 
      />
      <button onClick={handleTaskAdd} style={{ marginLeft: "10px" }}>Add Task</button>

      <div id="taskList">
      <h3>Task List</h3>
      {taskData.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
      <ol>
        {taskData.map((task, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            {editIndex === index ? (
              <>
                <input 
                  value={editText} 
                  onChange={(e) => setEditText(e.target.value)} 
                />
                <button onClick={() => saveEdit(index)}>Save</button>
                <button onClick={() => setEditIndex(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{task}</span>
                <button 
                  onClick={() => startEdit(index)} 
                  style={{ marginLeft: "10px" }}
                >
                  Edit
                </button>
              </>
            )}
            <button 
              onClick={() => handleTaskDelete(index)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
      )}
      </div>
    </div>
  );
}