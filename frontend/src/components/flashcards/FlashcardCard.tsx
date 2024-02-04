'use client';

import { useCallback, useState } from 'react';
import { Flashcard, deleteFlashcard } from '../../services/api';
import Button from '../Button';
import Card from '../Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

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

        <div className='flex justify-between items-center'>
          <Button callback={toggleAnswer} text='Toggle Answer'></Button>
          <button
            onClick={deleteThisCard}
            className='flex justify-center items-center rounded-full border-2 border-gray-800 hover:bg-red-200 w-12 h-12 p-2'
          >
            <FontAwesomeIcon
              icon={faTrashCan}
              className='fa-xl'
            ></FontAwesomeIcon>
          </button>
        </div>
      </Card>
    </>
  );
}
