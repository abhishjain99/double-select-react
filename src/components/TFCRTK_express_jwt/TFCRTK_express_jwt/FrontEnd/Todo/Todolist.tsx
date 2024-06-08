import React, { useEffect, useState, FunctionComponent, ChangeEvent, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './todolist.css';
import { fetchTodosThunk, addTodoThunk, removeTodoThunk, editTodoThunk } from './todoThunk'
import { startEdit, setEdit } from './todoSlice';
import { TodoState } from './todoInterfaces';
import { ThunkDispatch } from '@reduxjs/toolkit';
import TodolistItem from './TodolistItem';
import { Signup } from '../Auth/Signup';
import { Login } from '../Auth/Login';


const Todolist: FunctionComponent = () => {
  const [input, setInput] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token')); // state added to check whether authenticated or not based on token
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { todolist, editId, editInput } = useSelector((state: { todos: TodoState }) => state.todos);

  useEffect(() => {
    if(isAuthenticated) dispatch(fetchTodosThunk()); // Checked authentication here before fetching todos
  }, [dispatch, isAuthenticated]);

  // Todo handlers //
  const handleTodoSubmit = async () => {
    if (input.trim()) {
      dispatch(addTodoThunk({ content: input }));
      setInput('');
    }
  };

  const handleDelete = async (id: string) => {
    if(isAuthenticated) {
      await dispatch(removeTodoThunk(id));
      dispatch(fetchTodosThunk()); // Changed this to update UI
    } else {
      console.log("Cannot delete", id);
    }
  };

  const handleEdit = (id: string, content: string) => {
    if (editId === null) {
      dispatch(startEdit({ id, content }));
    } else {
      dispatch(editTodoThunk({ id, content: editInput! }));
    }
  };

  // Authentication handlers //
  const handleLogin = () => {
    setIsAuthenticated(true);
    dispatch(fetchTodosThunk());
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }

  return (
    <div className="todo-container">
      {!isAuthenticated
      ? (
        <Fragment>
          <Login onLogin={()=>handleLogin()} />
          <Signup onSignup={()=>handleLogin()} />
        </Fragment>
      )
      : (
        <Fragment>
          <button className='LogoutButton' onClick={handleLogout}>Logout</button>
          <div className="form-container">
            <input value={input} placeholder="Enter task" onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} />
            <button onClick={handleTodoSubmit}>Submit</button>
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
        </Fragment>
      )}
    </div>
  );
};

export default Todolist;
