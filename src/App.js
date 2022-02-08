import React, { useState, useEffect, useRef } from "react";

import { v4 as uuidv4 } from "uuid";

import "./App.css";

function App() {
  const firstRender = useRef(true);
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setTodos([
      ...todos,
      {
        text: inputValue,
        id: uuidv4(),
      },
    ]);

    setInputValue("");
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      localStorage.setItem("todos", JSON.stringify([...todos]));
    }
  }, [todos]);

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      const storedTodos = localStorage.getItem("todos");
      setTodos(JSON.parse([...todos, storedTodos]));
    }
  }, []);

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={addTodo}>
          <input
            type="text"
            autoFocus
            placeholder="Add a task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Add Todo</button>
        </form>
        {todos.map((todo) => (
          <div className="todo" key={todo.id}>
            <p>{todo.text}</p>
            <i
              onClick={() => removeTodo(todo.id)}
              className="fas fa-trash-alt"
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
