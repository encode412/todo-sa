import React, { useEffect, useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { v4 as uuidv4 } from "uuid"; // unique id library
import TodoForm from "./todo-form";
import TodoItem from "./todo-item";
import EditTodo from "./change-todo";

const Todo = () => {
  const [todos, setTodos] = useState([]); // set empty array to hold todo state

  // get todos from local storage on render
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(savedTodos);
  }, []);

  //sort functionality to show all todos
  const showAll = () => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(savedTodos);
  };

  //sort functionality to show completed todos
  const filterTodoByCompletion = (completed) => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const conpletedTodos = savedTodos?.filter((todo) => todo.completed === true);
    setTodos(conpletedTodos);
  };

  //sort functionality to show all active or uncompleted todos
  const filterTodoByActive = (completed) => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const activeTodos = savedTodos?.filter((todo) => todo.completed !== true);
    setTodos(activeTodos);
  };

  // add new todo to array and local storage with a unique id from (uuid4)
  const addTodo = (todo) => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ];
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // functionality to set todo as complete or not
  const toggleComplete = (id) => {
    const newTodos = todos?.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // functionality to delete todo
  const deleteTodo = (id) => {
    const newTodos = todos?.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // functionality to edit a todo
  const editTask = (task, id) => {
    const newTodos = todos?.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <div className="flex flex-col pt-10 md:pt-20 pb-8 mx-10 md:my-20 gap-12 items-center bg-white px-[1.3rem] md:px-20 w-5/6 md:w-1/2 overflow-hidden my-auto md:mx-auto rounded-2xl">
      <h1 className="uppercase lg:text-2xl xl:text-3xl text-xl text-center font-medium">
        Todo Task <br /> smart approaches
      </h1>
      <TodoForm
        addTodo={addTodo}
        task={todos}
        filterTodoByCompletion={filterTodoByCompletion}
        filterTodoByActive={filterTodoByActive}
        showAll={showAll}
      />
      {/* show message if todo is empty */}
      {todos?.length === 0 && (
        <div className="flex gap-2">
          <CgDanger color={"#504e4e"} size={20} />
          <span className="text-[#504e4e] xl:text-base text-sm">
            no goal has been set!!
          </span>
        </div>
      )}
      {/* display todo item or todo input if editing is true or false */}
      {todos?.map((todo) =>
        todo.isEditing ? (
          <EditTodo editTodo={editTask} task={todo} />
        ) : (
          <TodoItem
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTask}
            toggleComplete={toggleComplete}
          />
        )
      )}
      {todos?.length !== 0 && (
        <div className="flex items-center justify-center gap-4">
          <FaLightbulb color="#969494" size={20} />
          <span className="text-[#969494] xl:text-base text-sm text-center">
            click on the checkbox to mark a task as completed
          </span>
        </div>
      )}
    </div>
  );
};

export default Todo;
