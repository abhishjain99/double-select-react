import React, { useEffect, useState, FunctionComponent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './todolist.css';
import { fetchTodosThunk, addTodoThunk, removeTodoThunk, editTodoThunk } from './todoThunk'
import { startEdit, setEdit } from './todoSlice';
import { TodoState } from './todoInterfaces';
import { ThunkDispatch } from '@reduxjs/toolkit';
import TodolistItem from './TodolistItem';


const Todolist: FunctionComponent = () => {
  const [input, setInput] = useState<string>('');
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { todolist, editId, editInput } = useSelector((state: { todos: TodoState }) => state.todos);

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, [dispatch]);

  const handleSubmit = async () => {
    if (input.trim()) {
      dispatch(addTodoThunk({ content: input }));
      setInput('');
    }
  };

  const handleDelete = async (id: string) => {
    await dispatch(removeTodoThunk(id));
    dispatch(fetchTodosThunk()); // Changed this to update UI
  };

  const handleEdit = (id: string, content: string) => {
    if (editId === null) {
      dispatch(startEdit({ id, content }));
    } else {
      dispatch(editTodoThunk({ id, content: editInput! }));
    }
  };

  return (
    <div className="todo-container">
      <div className="form-container">
        <input value={input} placeholder="Enter task" onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className="list-container">
        <ul>
          {todolist.length
          ? todolist.map((item) => {
            const isEdit = item.id === editId;
            return ( // Changing this to separate items render logic from main code
              <TodolistItem
                key={item.id}
                item={item}
                isEdit={isEdit}
                dispatch={dispatch}
                editId={editId}
                editInput={editInput}
                setEdit={setEdit}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            );
          })
        : <div>No task to do.</div>}
        </ul>
      </div>
    </div>
  );
};

export default Todolist;
