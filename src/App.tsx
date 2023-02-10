import React, { useState, useEffect, useRef } from "react"
import "./App.css"
import InputField from "./components/InputField"
import TodoList from "./components/ToDoList"
import { Todo } from "./model"
import { DragDropContext, DropResult } from "react-beautiful-dnd"

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])

  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo("")
    }
  }

  const initialRender = useRef(true)

  useEffect(() => {
    const data = window.localStorage.getItem("allTodos")
    if (data !== null) {
      setTodos(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    window.localStorage.setItem("allTodos", JSON.stringify(todos))
  }, [todos])

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return
    let add,
      active = todos,
      complete = completedTodos

    if (source.droppableId === "TodosList") {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

    setCompletedTodos(complete)
    setTodos(active)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  )
}

export default App
