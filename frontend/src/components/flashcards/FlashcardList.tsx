import { fetchFlashcardsJSON } from '../../services/api';
import FlashcardListClient from './FlashcardList.client';

export default async function FlashcardList() {
  const flashcards = await fetchFlashcardsJSON();

  return (
    <div className='flex flex-col gap-5 w-4xl'>
      <FlashcardListClient flashcards={flashcards}></FlashcardListClient>
    </div>
  );
}
