interface ButtonProps {
  text: string;
  callback: React.MouseEventHandler;
}

const Button = function (props: ButtonProps) {
  return (
    <div className='flex'>
      <button
        onClick={props.callback}
        className={`bg-gray-300 p-4 rounded-md hover:bg-gray-400 transition-all ease-in-out active:transform active:scale-95`}
      >
        {props.text}
      </button>
    </div>
  );
};

export default Button;
