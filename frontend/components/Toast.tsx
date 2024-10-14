import React from "react";
interface propTypes {
  message: string;
  error: boolean;
}
const Toast: React.FC<propTypes> = ({ message, error }) => {
  return (
    <div
      className={`flex gap-5 items-center rounded-md bg-[#f0f0f0] p-4 fixed bottom-8 right-16 border-2 border-neutral-500 w-max shadow-lg shadow-[#f5f5f5]`}
    >
      <div className="size-5 rounded-full border-2  border-black border-t-[#f5f5f5] animate-spin [animation-duration:0.7s]" />
      <p className="text-black text-sm flex items-center justify-center">
        {message}
      </p>
      {error && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#f87171"
          viewBox="0 0 256 256"
        >
          <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
        </svg>
      )}
    </div>
  );
};

export default Toast;
