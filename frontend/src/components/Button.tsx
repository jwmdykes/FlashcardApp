'use client';

import { useFormStatus } from 'react-dom';

interface ButtonProps {
  text: string;
  callback?: React.MouseEventHandler;
  type?: null | 'submit';
}

const Button = function (props: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <div className='flex'>
      <button
        onClick={props.callback}
        className={`bg-gray-300 p-4 rounded-md hover:bg-gray-400 transition-all ease-in-out active:transform active:scale-95`}
        type={props.type == null ? 'button' : props.type}
        aria-disabled={pending}
      >
        {props.text}
      </button>
    </div>
  );
};

export default Button;
