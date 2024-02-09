import { ComponentProps, FunctionComponent, ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';

interface NavProps extends ComponentProps<'div'> {
  children: ReactNode;
}

export default function Nav({ children, ...props }: NavProps) {
  return (
    <div className='flex h-14 bg-neutral-300 shadow-md' {...props}>
      {children}
    </div>
  );
}

interface NavButtonProps extends LinkProps {
  children: ReactNode;
}

export function NavButton({ children, ...props }: NavButtonProps) {
  return (
    <Link
      className='flex items-center justify-center px-3 hover:bg-neutral-400'
      {...props}
    >
      {children}
    </Link>
  );
}

interface NavButtonTextProps extends ComponentProps<'span'> {
  children: ReactNode;
}

export const NavButtonText: FunctionComponent<NavButtonTextProps> = ({
  children,
  ...props
}) => {
  return (
    <span className='text-xl' {...props}>
      {children}
    </span>
  );
};
