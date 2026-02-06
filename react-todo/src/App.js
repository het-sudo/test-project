import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");   
  const [editIndex, setEditIndex] = useState(null); 


  const handleAddUpdate = () => {
    if (task.trim() === "") return; // ignore empty
    if (editIndex !== null) {
      // Update existing
      const newTodos = [...todos];
      newTodos[editIndex] = task;
      setTodos(newTodos);
      setEditIndex(null);
    } else {
      // Add new
      setTodos([...todos, task]);
    }
    setTask(""); // clear input
  };

  // Delete todo
  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // Edit todo
  const handleEdit = (index) => {
    setTask(todos[index]);
    setEditIndex(index);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "auto" }}>
      <h2>Simple Todo App</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
        style={{ width: "70%", padding: "0.5rem" }}
      />
      <button onClick={handleAddUpdate} style={{ padding: "0.5rem", marginLeft: "0.5rem" }}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
        {todos.map((t, i) => (
          <li key={i} style={{ marginBottom: "0.5rem", display: "flex", justifyContent: "space-between" }}>
            <span>{t}</span>
            <span>
              <button onClick={() => handleEdit(i)} style={{ marginRight: "0.5rem" }}>Edit</button>
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
