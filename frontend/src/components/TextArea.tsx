interface TextAreaProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export function TextArea({ value, onChange }: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className='rounded-md  border-neutral-300 border-[1px] p-2 focus:ring-2 focus:ring-gray-400 focus:outline-none'
      name=''
      id=''
      rows={2}
    ></textarea>
  );
}
