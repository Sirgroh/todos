import React, { useState } from 'react'
import { TiDelete, TiEdit } from 'react-icons/ti'
import { FiPlus } from 'react-icons/fi'
import './todos.css'

const Todos = () => {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState(null)

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      if (editMode) {
        const updatedTodos = todos.map((todo) =>
          todo.id === editId ? { id: editId, text: inputValue } : todo,
        )
        setTodos(updatedTodos)
        setEditMode(false)
        setEditId(null)
      } else {
        setTodos([...todos, { text: inputValue, id: Date.now() }])
      }
      setInputValue('')
    }
  }

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

  const handleEditTodo = (id, text) => {
    setInputValue(text)
    setEditMode(true)
    setEditId(id)
  }

  return (
    <div className="todo">
      <div className="todo-app">
        <h1 className="todo-h1">My Todo App</h1>
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add a new todo..."
            className="todo-input"
          />
          <button className="btn-todo" onClick={handleAddTodo}>
            {editMode ? <TiEdit /> : <FiPlus />}
          </button>
        </div>
        <ul className="todo-ul">
          {todos.map((todo) => (
            <li key={todo.id} className="list">
              {todo.text}
              <div>
                <TiEdit
                  className="icon-button"
                  onClick={() => handleEditTodo(todo.id, todo.text)}
                />
                <TiDelete
                  style={{ marginLeft: '5px' }}
                  className="icon-button"
                  onClick={() => handleDeleteTodo(todo.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Todos
