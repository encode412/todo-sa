import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const TodoItem = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  // customized input checkbox
  const checkbox = `
  .checkbox:hover input ~ .checkmark {
    background-color: #ffffff;
  }
  
  .checkbox input:checked ~ .checkmark {
    background-color: #ffffff;
  }
  
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  .checkbox input:checked ~ .checkmark:after {
    display: block;
  }
  
  .checkbox .checkmark:after {
    left: 9px;
    top: 3px;
    width: 9px;
    height: 20px;
    border: solid #8758ff;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  } 
`;

  return (
    <div className="flex w-full items-center justify-between">
      <p
        className={`${
          task.completed ? "line-through decoration-[#FF0000]" : ""
        } hover:cursor-pointer md:text-base text-sm`}
      >
        {task.task}
      </p>
      <div className="flex gap-10">
        {/* input checkbox for setting todo as completed */}
        <label className="checkbox relative block cursor-pointer">
          <input
            name="completed"
            onChange={() => toggleComplete(task.id)}
            checked={task.completed}
            className="absolute opacity-0 cursor-pointer h-0 w-0"
            type="checkbox"
          />
          <span className="checkmark absolute top-[-5%] left-[-1rem] h-7 w-7 bg-primary border border-[#6e6c6c]"></span>
        </label>
        <MdEdit
          color="#000000"
          size={20}
          onClick={() => editTodo(task.task, task.id)}
          className="cursor-pointer hover:animate-shake transition-all"
        />
        <FaTrashAlt
          color="#FF0000"
          size={20}
          onClick={() => deleteTodo(task.id)}
          className="cursor-pointer hover:animate-shake transition-all"
        />
      </div>
      <style>{checkbox}</style>
    </div>
  );
};
export default TodoItem;
