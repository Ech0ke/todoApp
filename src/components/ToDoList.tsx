import { Todo } from "../model"
import SingleTodo from "./SingleTodo"
import "./styles.css"
import { Droppable } from "react-beautiful-dnd"

interface Props {
  todos: Todo[]
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
  completedTodos: Todo[]
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="ToDoList--container">
      <Droppable droppableId="TodosList">
        {(provided) => (
          <div
            className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="ToDoList--heading">Active tasks</span>
            {todos?.map((todo, index) => (
              <SingleTodo
                todo={todo}
                key={todo.id}
                index={index}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided) => (
          <div
            className="todos remove"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="ToDoList--heading">Completed tasks</span>
            {completedTodos?.map((todo, index) => (
              <SingleTodo
                todo={todo}
                key={todo.id}
                index={index}
                todos={completedTodos}
                setTodos={setCompletedTodos}
              />
            ))}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default TodoList
