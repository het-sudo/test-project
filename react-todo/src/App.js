import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");   
  const [editIndex, setEditIndex] = useState(null); 


  const handleAddUpdate = () => {
    if (task.trim() === "") return;
    if (editIndex !== null) {
     
      const newTodos = [...todos];
      newTodos[editIndex] = task;
      setTodos(newTodos);
      setEditIndex(null);
    } else {
     
      setTodos([...todos, task]);
    }
    setTask(""); 
  };


  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleEdit = (index) => {
    setTask(todos[index]);
    setEditIndex(index);
  };

  return (
    <div >
      <h2>Simple Todo App</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
    
      />
      <button onClick={handleAddUpdate} >
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <ul>
        {todos.map((t, i) => (
          <li key={i}>
            <span>{t}</span>
            <span>
              <button onClick={() => handleEdit(i)} >Edit</button>
              <button onClick={() => handleDelete(i)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>

      {todos.length === 0 && <p>No tasks yet!</p>}
    </div>
  );
}

export default App;
