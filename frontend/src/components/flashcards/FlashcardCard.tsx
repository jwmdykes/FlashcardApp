'use client';

import { useCallback, useState } from 'react';
import { Flashcard, deleteFlashcard } from '../../services/api';
import Button from '../Button';
import Card from '../Card';

export default function FlashcardCard(props: { flashcard: Flashcard }) {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  const toggleAnswer: React.MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    setShowAnswer((current) => {
      return !current;
    });
  }, []);

  const deleteThisCard: React.MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    deleteFlashcard(props.flashcard.id!);
  }, []);

  return (
    <>
      <Card>
        <div className='flex justify-between gap-10'>
          <span>{props.flashcard.question}</span>
          <span className={showAnswer ? 'visible' : 'invisible'}>
            {props.flashcard.answer}
          </span>
        </div>

        <div className='flex justify-between'>
          <Button callback={toggleAnswer} text='Toggle Answer'></Button>
          <Button callback={deleteThisCard} text='Delete'></Button>
        </div>
      </Card>
    </>
  );
}
