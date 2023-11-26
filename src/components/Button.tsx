import React from "react";

interface ButtonProps {
  children: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <button className="border-1 btn btn-xs mb-2 mr-2 mt-1 w-20 border-slate-500 bg-slate-400 px-8 capitalize text-white">
      {children}
    </button>
  );
};

export default Button;
