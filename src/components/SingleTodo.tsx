import React from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { MdDone } from "react-icons/md"
import "./styles.css"

type Props = {
    todo: Todo,
    todos:Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo:React.FC<Props> = ({todo, todos, setTodos}) => {
  return (
    <form className="todos--single">
        <span className="todos--singleText">{todo.todo}</span>
        <div>
            <span className="todos--icon">
                <AiFillEdit/>
            </span>
            <span className="todos--icon">
                <AiFillDelete/>
            </span>
            <span className="todos--icon">
                <MdDone/>
            </span>
        </div>
    </form>
  )
}

export default SingleTodo