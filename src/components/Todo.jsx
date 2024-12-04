import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTodo,
  updateTodo,
  toggleComplete,
} from "../features/todo/todoSlice";

const Todo = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [updatedText, setUpdatedText] = useState("");

  const filteredTodos = todos.filter((todo) => {
    const today = new Date().toISOString().split("T")[0];
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    if (filter === "overdue") return !todo.completed && todo.dueDate < today;
    return true;
  });

  const handleUpdate = (id) => {
    if (updatedText.trim()) {
      dispatch(updateTodo({ id, text: updatedText }));
      setEditingId(null);
      setUpdatedText("");
    }
  };

  return (
    <div className="todo-container">
      <h1>Tasks</h1>

      <div className="filter-buttons">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active" : ""}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={filter === "pending" ? "active" : ""}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("overdue")}
          className={filter === "overdue" ? "active" : ""}
        >
          Overdue
        </button>
      </div>

      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              {editingId === todo.id ? (
                <div>
                  <input
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                    className="edit-input"
                  />
                  <button
                    onClick={() => handleUpdate(todo.id)}
                    className="save-button"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <h3
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.text}
                  </h3>
                  <p className="due-date">Due: {todo.dueDate}</p>
                  <button
                    onClick={() => dispatch(toggleComplete(todo.id))}
                    className="toggle-button"
                  >
                    {todo.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className="delete-button"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setUpdatedText(todo.text);
                    }}
                    className="update-button"
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Todo;
