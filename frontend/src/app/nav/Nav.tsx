import { ReactNode } from 'react';
import Link from 'next/link';

interface NavProps {
  children: ReactNode;
}

export default function Nav({ children }: NavProps) {
  return <div className='flex h-14 bg-neutral-300 shadow-md'>{children}</div>;
}

interface NavButtonProps {
  text: string;
  href: string;
}

export function NavButton({ text, href }: NavButtonProps) {
  return (
    <>
      <Link
        href={href}
        className='flex items-center justify-center px-3 hover:bg-neutral-400'
      >
        <div className='text-xl'>{text}</div>
      </Link>
    </>
  );
}
