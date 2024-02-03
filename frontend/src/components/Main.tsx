'use server';

export default async function Main({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className='px-4 pt-16 pb-20 flex flex-col m-auto container'>
      {children}
    </main>
  );
}
