import FlashcardList from './flashcards/FlashcardList';

export default function Home() {
  return (
    <main className='px-4 pt-16 flex flex-col m-auto container'>
      <h1>Flashcards</h1>
      <div className='flex justify-center'>
        <FlashcardList></FlashcardList>
      </div>
    </main>
  );
}
