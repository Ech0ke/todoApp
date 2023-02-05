import "./styles.css"

interface Props {
  todo: string
  setTodo: React.Dispatch<React.SetStateAction<string>>
  handleAdd: (e: React.FormEvent) => void
}

export const InputField = ({ todo, setTodo, handleAdd }: Props) => {
  return (
    <form className="input">
      <input
        type="input"
        placeholder="Enter a task"
        className="input--box"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="input--submit" type="submit" onClick={handleAdd}>
        Go
      </button>
    </form>
  )
}
