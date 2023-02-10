import React, { useState, useRef, useEffect } from "react"
import { Todo } from "../model"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { MdDone } from "react-icons/md"
import "./styles.css"
import { Draggable } from "react-beautiful-dnd"

type Props = {
  todo: Todo
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  index: number
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index }) => {
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
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todos--single"
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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
              onClick={(e) => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit)
                }
                if (edit) {
                  handleEdit(e, todo.id)
                  setEdit(false)
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="todos--icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span
              className="todos--icon"
              onClick={() =>
                edit ? todo.isDone === false : handleDone(todo.id)
              }
            >
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default SingleTodo
