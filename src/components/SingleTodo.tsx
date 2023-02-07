import React, { useState, useRef, useEffect } from "react"
import { Todo } from "../model"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { MdDone } from "react-icons/md"
import "./styles.css"

type Props = {
  todo: Todo
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const handleDone = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...todo, isDone: !t.isDone } : t))
    )
  }

  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault()
    if (editTodo === "") {
      handleDelete(id)
      return
    }

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    )
    setEdit(false)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])
  return (
    <form className="todos--single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos--singleText todos--edit"
        />
      ) : todo.isDone ? (
        <s className="todos--singleText">{todo.todo}</s>
      ) : (
        <span className="todos--singleText">{todo.todo}</span>
      )}

      <div>
        <span
          className="todos--icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit)
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="todos--icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="todos--icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  )
}

export default SingleTodo
