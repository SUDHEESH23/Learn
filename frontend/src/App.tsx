import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import './App.css';

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const { taskData, loading, addNewTask, removeTask, editTask, toggleTaskStatus } = useTasks();

  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskText, setEditTaskText] = useState("");

  const handleEditClick = (task: any) => {
    setEditTaskId(task._id);
    setEditTaskText(task.text);
  };

  const handleSaveEdit = async (id: string) => {
    await editTask(id, editTaskText);
    setEditTaskId(null);
  };

  const handleAdd = async () => {
    if (!inputValue.trim()) return;
    await addNewTask(inputValue);
    setInputValue("");
  };

  return (
    <div id="container">
      <h1>Task Manager</h1>

      {/* Input Section - Box Model: Horizontal Flex */}
      <div id="inputSection">
        <input 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="What needs to be done?"
        />
        <button className="add-btn" onClick={handleAdd}>Add Task</button>
      </div>

      <div id="taskList">
        <h2>Your Tasks</h2>
        {loading ? (
          <p className="status-msg">Loading tasks...</p>
        ) : taskData.length === 0 ? (
          <p className="status-msg">No tasks found. Add one above!</p>
        ) : (
          <ul>
            {taskData.map(task => (
              <li key={task._id} className="task-item">
                {editTaskId === task._id ? (
                  /* Edit Mode UI */
                  <div className="task-row">
                    <input 
                      className="edit-input"
                      value={editTaskText} 
                      onChange={(e) => setEditTaskText(e.target.value)} 
                      autoFocus
                    />
                    <button className="save-btn" onClick={() => handleSaveEdit(task._id)}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditTaskId(null)}>Cancel</button>
                  </div>
                ) : (
                  /* View Mode UI with Checkbox and Toggle */
                  <div className="task-row">
                    <input 
                      type="checkbox" 
                      className="task-checkbox"
                      checked={task.completed} 
                      onChange={() => toggleTaskStatus(task._id, task.completed)} 
                    />
                    
                    <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                      {task.text}
                    </span>

                    <div className="actions">
                      <button className="edit-btn" onClick={() => handleEditClick(task)}>Edit</button>
                      <button className="delete-btn" onClick={() => removeTask(task._id)}>Delete</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}