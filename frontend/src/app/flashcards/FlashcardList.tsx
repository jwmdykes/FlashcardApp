'use client';

import { useCallback, useEffect, useState } from 'react';
import { Flashcard, fetchFlashcards } from '../services/api';

export function Flashcard(props: { flashcard: Flashcard }) {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const toggleAnswer = useCallback(
    () =>
      setShowAnswer((current) => {
        return !current;
      }),
    []
  );

  return (
    <>
      <div className='flex flex-col bg-neutral-100 rounded-md p-8 gap-12 shadow-md'>
        <div className='flex justify-between gap-10'>
          <span>{props.flashcard.question}</span>
          <span className={showAnswer ? 'visible' : 'invisible'}>
            {props.flashcard.answer}
          </span>
        </div>

        <div className='flex'>
          <button
            onClick={toggleAnswer}
            className={`bg-gray-300 p-4 rounded-md hover:bg-gray-400 transition-all ease-in-out active:transform active:scale-95`}
          >
            Toggle Answer
          </button>
        </div>
      </div>
    </>
  );
}

export default function FlashcardList() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFlashcards();
        console.log(data);
        setFlashcards(data);
      } catch (error) {
        console.error('Failed to fetch flashcards:', error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <div className='flex flex-col gap-5 w-4xl'>
        {flashcards.map((flashcard) => (
          <Flashcard key={flashcard.id} flashcard={flashcard} />
        ))}
      </div>
    </div>
  );
}
