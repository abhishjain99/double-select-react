import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './todolist.css';
import { fetchTodosThunk, addTodoThunk, removeTodoThunk, editTodoThunk } from './todoThunk'
import { startEdit, setEdit } from './todoSlice';

const Todolist = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { todolist, editId, editInput } = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, [dispatch]);

  const handleSubmit = async () => {
    if (input.trim()) {
      dispatch(addTodoThunk({ content: input }));
      setInput('');
    }
  };

  const handleDelete = (id) => {
    dispatch(removeTodoThunk(id));
  };

  const handleEdit = (id, content) => {
    if (editId === null) {
      dispatch(startEdit({ id, content }));
    } else {
      dispatch(editTodoThunk({ id, content: editInput }));
    }
  };

  return (
    <div className="todo-container">
      <div className="form-container">
        <input 
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className="list-container">
        <ul>
          {todolist.map((item) => {
            const isEdit = item.id === editId;
            return (
              <li key={item.id}>
                {isEdit
                ? ( <input value={editInput} onChange={(e) => dispatch(setEdit(e.target.value))} /> )
                : ( <span>{item.content}</span> )}

                <div className="todo-action">
                  <button onClick={() => handleEdit(item.id, item.content)}>
                    {editId === item.id ? 'Save' : 'Edit'}
                  </button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Todolist
