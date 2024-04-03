import React, { useState } from "react";
import Button from "../ui/button";

const ChangeTodo = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    // stops default action from happening
    e.preventDefault();
    // edits todo
    editTodo(value, task.id);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[100%] flex items-center space-x-6"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border w-5/6 border-[#8758ff] p-2 md:px-6 px-4 md:text-base text-sm rounded-3xl outline-0"
        placeholder="Update todo"
      />
      <Button text="Add Todo" />
    </form>
  );
};

export default ChangeTodo;
