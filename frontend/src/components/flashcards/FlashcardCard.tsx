'use client';

import { useCallback, useState } from 'react';
import { Flashcard, deleteFlashcard } from '../../services/api';
import Button from '../Button';
import Card from '../Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNotifications } from '../notifications/NotificationContext';

export default function FlashcardCard(props: { flashcard: Flashcard }) {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const { addNotification } = useNotifications();

  const toggleAnswer: React.MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    setShowAnswer((current) => {
      return !current;
    });
  }, []);

  const deleteThisCard: React.MouseEventHandler = useCallback(async (e) => {
    e.preventDefault();
    try {
      await deleteFlashcard(props.flashcard.id!);
      addNotification({
        message: 'Deleted Card',
        type: 'success',
      });
    } catch {
      addNotification({
        message: 'Failed to Delete Card',
        type: 'failure',
      });
    }
  }, []);

  return (
    <>
      <Card>
        <div className='flex justify-between gap-10'>
          <div className='flex gap-3 items-baseline'>
            <span className='text-xl font-medium'>Question: </span>
            <span>{props.flashcard.question}</span>
          </div>
          <div
            className={`flex gap-3 items-baseline ${
              showAnswer ? 'visible' : 'invisible'
            }`}
          >
            <span className='text-xl font-medium'>Answer: </span>
            <span>{props.flashcard.answer}</span>
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <Button callback={toggleAnswer} text='Toggle Answer'></Button>
          <button
            onClick={deleteThisCard}
            className='flex justify-center items-center rounded-md  border-gray-800 bg-gray-300 hover:bg-gray-400 w-12 h-12 p-2 shadow-md transition-all ease-in-out active:transform active:scale-95'
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
