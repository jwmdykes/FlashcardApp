'use server';

import { fetchFlashcardsJSON } from '../../services/api';
import FlashcardCard from './FlashcardCard';

export default async function FlashcardList() {
  const flashcards = await fetchFlashcardsJSON();

  return (
    <div className='flex flex-col gap-5 w-4xl'>
      {flashcards.map((flashcard) => (
        <FlashcardCard key={flashcard.id} flashcard={flashcard} />
      ))}
    </div>
  );
}
