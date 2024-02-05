interface TextAreaProps extends React.ComponentProps<'textarea'> {}

export function TextArea({ ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      className='rounded-md border-neutral-300 border-[1px] p-2 focus:ring-2 focus:ring-gray-400 focus:outline-none'
    ></textarea>
  );
}
