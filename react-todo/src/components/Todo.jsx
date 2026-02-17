import React, { useState } from 'react'
import "../App.css"
function Todo() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState("")

  const addTodos = () => {
    if (input.trim() === "") return

    setTodos(prev => [ ...prev,{ id: Date.now(), text: input, completed: false } ])

    setInput("")
  }

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>todo.id === id? { ...todo, completed: !todo.completed } : todo    ) )
  }


  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const startEdit = (todo) => {
    setEditId(todo.id)
    setEditText(todo.text)
  }

  const saveEdit = () => {
    if (editText.trim() === "") return

    setTodos(prev =>prev.map(todo => todo.id === editId? { ...todo, text: editText } : todo))

    setEditId(null)
    setEditText("")
  }

  const cancelEdit = () => {
    setEditId(null)
    setEditText("")
  }

  return (
    <>
      <h2>Todo App</h2>

      <input type="text" value={input} style={{}} onChange={(e) => setInput(e.target.value)}/>
      <button onClick={addTodos}>Add</button>

      <ul>
        {todos.map((todo) => (
        <li key={todo.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  {editId === todo.id ? (
    <>
      <input
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
      />
      <button onClick={saveEdit}>Save</button>
      <button onClick={cancelEdit}>Cancel</button>
    </>
  ) : (
    <>
      <span
        onClick={() => toggleTodo(todo.id)}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          flex: 1, 
        }}
      >
        {todo.text}
      </span>

      <button onClick={() => startEdit(todo)}>Edit</button>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </>
  )}
</li>

        ))}
      </ul>
    </>
  )
}

export default Todo
