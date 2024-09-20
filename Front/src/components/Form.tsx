import "./FormStyle.css";
import Todo from "./dto/todoDto";

interface FormProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const Form: React.FC<FormProps>= ({setTodos}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form1 = e.target as HTMLFormElement
    const value =  form1.todo.value;
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        title: value,
        id: crypto.randomUUID(),
        is_completed: false
      },
    ]);
    form1.reset()
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="todo">
        <input
        type="text"
        name="todo"
        id="todo"
        placeholder="Write your next tasks"
        />
      </label>
      <button>
        <span className="visually-hidden ">+</span>
      </button>
    </form>
  );
}

export default Form;