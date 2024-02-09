"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps extends React.ComponentProps<"button"> {}

const Button = function ({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <div className="flex">
      <button
        {...props}
        className={`bg-gray-300 p-4 rounded-md hover:bg-gray-400 transition-all ease-in-out active:transform active:scale-95 aria-disabled:${pending} ${
          pending ? "bg-gray-400 hover:bg-gray-400" : ""
        }`}
        aria-disabled={pending}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
