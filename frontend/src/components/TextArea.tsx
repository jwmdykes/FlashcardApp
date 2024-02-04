interface TextAreaProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  name?: string;
}

export function TextArea({ value, onChange, name }: TextAreaProps) {
  return (
    <textarea
      value={value}
      name={name}
      onChange={onChange}
      className='rounded-md  border-neutral-300 border-[1px] p-2 focus:ring-2 focus:ring-gray-400 focus:outline-none'
      id=''
      rows={2}
    ></textarea>
  );
}
