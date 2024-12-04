import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';
import '../index.css'; 

const AddTodo = () => {
  const [value, setValue] = useState('');
  const [dueDate, setDueDate] = useState(''); 
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (value.trim() && dueDate) {
      dispatch(addTodo({ text: value, dueDate })); 
      setValue('');
      setDueDate('');
    }
  };

  return (
    <div className="todo-container">
      <h1>Add Task</h1>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Add Task"
        className="todo-input"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="date-input"
      />
      <button onClick={submitHandler} className="add-button">Add</button>
    </div>
  );
};

export default AddTodo;
