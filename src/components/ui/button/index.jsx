import React from "react";

const Button = ({ text }) => {
  // reusable button component
  return (
    <button
      type="submit"
      className="bg-[#8758ff] py-1 px-2 rounded text-white xl:text-base text-sm text-nowrap hover:scale-105 transition-all"
    >
      {text}
    </button>
  );
};

export default Button;
