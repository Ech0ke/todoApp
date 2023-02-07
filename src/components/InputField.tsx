import "./styles.css"
import { useRef } from "react"
interface Props {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
  handleAdd: (e: React.FormEvent) => void
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form className="input">
      <input
        ref={inputRef}
        type="input"
        placeholder="Enter a task"
        className="input--box"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        className="input--submit"
        type="submit"
        onClick={(e) => {
          handleAdd(e)
          inputRef.current?.blur()
        }}
      >
        Go
      </button>
    </form>
  )
}

export default InputField
