import "./styles.css"

export const InputField = () => {
  return (
    <form className="input">
      <input type="input" placeholder="Enter a task" className="input--box" />
      <button className="input--submit" type="submit">
        Go
      </button>
    </form>
  )
}
