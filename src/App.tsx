import React, { useState, useEffect, useRef } from "react"
import "./App.css"
import InputField from "./components/InputField"
import TodoList from "./components/ToDoList"
import { Todo } from "./model"

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todo[]>([])

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
    console.log(data)
    if (data !== null) {
      console.log(`Before parse: ${data}`)
      setTodos(JSON.parse(data))
      console.log(`After parse: ${data}`)
    }
  }, [])

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
      return
    }

    window.localStorage.setItem("allTodos", JSON.stringify(todos))
  }, [todos])

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  )
}

export default App
