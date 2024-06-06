import { ChangeEvent } from 'react';

const TodolistItem = (props: any) => {
  const { item, isEdit, dispatch, editId, editInput, setEdit, handleEdit, handleDelete } = props;

  return (
    <li>
      {isEdit
      ? ( <input value={editInput!} onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(setEdit(e.target.value))} /> )
      : ( <span>{item.content}</span> )}

      <div className="todo-action">
        <button onClick={() => handleEdit(item.id, item.content)}>
          {editId === item.id ? 'Save' : 'Edit'}
        </button>
        <button onClick={() => handleDelete(item.id)}>Delete</button>
      </div>
    </li>
  )
}

export default TodolistItem;