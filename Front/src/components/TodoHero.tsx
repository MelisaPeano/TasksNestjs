import "./TodoHeroStyle.css";


interface TodoHeroProps {
  todos_completed: number;
  total_todos: number;
}
const TodoHero: React.FC<TodoHeroProps> = ({todos_completed, total_todos}) => {

  return (
    <section className="todohero_section">
      <div className="last-child">
        <p>Task Done</p>
        <p>Keep it up</p>
      </div>
      <div>
        {todos_completed}/{total_todos}
      </div>
    </section>
  )
}

export default TodoHero;