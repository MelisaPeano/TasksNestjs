
import Todo from "./dto/todoDto";

interface FormProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const Form: React.FC<FormProps>= ({setTodos}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form1 = e.target as HTMLFormElement
    const titleValue = form1.todo.value;           // Valor del título
    const descriptionValue = form1.description.value;
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        title: titleValue,
        description: descriptionValue,
        id: crypto.randomUUID(),
        is_completed: false
      },
    ]);
    form1.reset()
  };
  return (
    <form className="card basis-1/4" onSubmit={handleSubmit}>
      <label className="todo">
        <input
        type="text"
        name="todo"
        id="todo"
        placeholder="Write your title"
        />
         <input
        type="text"
        name="description"
        id="description"
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