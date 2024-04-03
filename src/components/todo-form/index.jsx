import React, { useState } from "react";
import { MdOutlineSort } from "react-icons/md";
import Button from "../ui/button";

const TodoForm = ({
  addTodo,
  task,
  filterTodoByCompletion,
  filterTodoByActive,
  showAll,
}) => {
  const [value, setValue] = useState("");
  const [sort, setSort] = useState(false);

  // toggle sort value to show and hide sort values
  const handleSort = () => {
    setSort(!sort);
  };

  // sort functionality to filter based on selected option
  const handleFilter = (e) => {
    const value = e.target.value;
    if (value == "completed") {
      filterTodoByCompletion(task.completed);
    }
    if (value == "active") {
      filterTodoByActive(task.id);
    }
    if (value === "all") {
      showAll(task);
    }
  };

  // submit todo and save
  const handleSubmit = (e) => {
    // stops default action from happpening
    e.preventDefault();
    if (value) {
      // add todo
      addTodo(value);
      // clears the form after submit
      setValue("");
    }
  };

  // customized dropdown arrow in select
  const selectArrow = `
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: transparent;
    background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='30' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 5px;
    border: 1px solid #dfdfdf;
    border-radius: 2px;
    margin-right: 3rem;
    padding: 1rem;
    padding-right: 2rem;
  }`;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-[100%] justify-between space-x-6 flex"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border w-5/6 border-[#8758ff] p-2 px-4 md:px-6 rounded-3xl md:text-base text-xs outline-0"
          placeholder="What are your goals for today?"
        />
        <Button text="Add Todo" />
      </form>
      <div className="flex relative gap-2 hover:cursor-pointer items-center w-full justify-end">
        {/* sort options to get toggled by state of sort */}
        {sort && (
          <select
            name="sort"
            id="sort"
            className="absolute right-[10%] border border-[#8758ff] mx-2 rounded-[10px] outline-none px-4 py-2 md:text-base text-sm md:mr-0 mr-10"
            onChange={handleFilter}
          >
            <option value="completed" name="sorted" className="md:text-base text-sm">
              by completed tasks
            </option>
            <option value="active" name="sorted" className="md:text-base text-sm">
              by active tasks
            </option>
            <option value="all" name="sorted" className="md:text-base text-sm" selected>
              all tasks
            </option>
          </select>
        )}
        {/* displays sort if task length is more than 1  */}
       {task.length > 1  && <span className="flex gap-2 items-center " onClick={handleSort}>
          <MdOutlineSort size={20} />
          <span className="md:text-[18px] text-sm">Sort</span>
        </span>}
      </div>
      <hr className="w-full bg-black text-black" />
      <style>{selectArrow}</style>
    </>
  );
};

export default TodoForm;
