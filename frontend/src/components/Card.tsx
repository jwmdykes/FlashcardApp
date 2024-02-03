export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col bg-neutral-100 rounded-md p-8 gap-6 shadow-md'>
      {children}
    </div>
  );
}
