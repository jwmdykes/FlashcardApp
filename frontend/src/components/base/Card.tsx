import { twMerge } from 'tailwind-merge';

interface CardProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
}

export default function Card({ children, ...props }: CardProps) {
  return (
    <div
      className={twMerge(
        `flex flex-col bg-neutral-100 rounded-md p-8 gap-6 shadow-md ${props.className}`
      )}
    >
      {children}
    </div>
  );
}
