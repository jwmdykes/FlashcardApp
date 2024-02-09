'use server';

import { ComponentProps, ReactNode } from 'react';

export interface MainProps extends ComponentProps<'main'> {
  children: ReactNode;
}

export default async function Main({ children }: MainProps) {
  return (
    <main className='px-4 pt-16 pb-20 flex flex-col m-auto container'>
      {children}
    </main>
  );
}
