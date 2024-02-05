'use client';

import { useCallback, useState } from 'react';
import { Flashcard, deleteFlashcard } from '../../services/api';
import Button from '../base/Button';
import Card from '../base/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNotifications } from '../notifications/NotificationContext';
import FlashcardEdit from './FlashcardEdit';

export default function FlashcardCard(props: { flashcard: Flashcard }) {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { addNotification } = useNotifications();

  const toggleModal: React.MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    setModalVisible((current) => !current);
  }, []);

  const toggleAnswer: React.MouseEventHandler = useCallback((e) => {
    e.preventDefault();
    setShowAnswer((current) => {
      return !current;
    });
  }, []);

  const deleteThisCard: React.MouseEventHandler = useCallback(
    async (e) => {
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
    },
    [addNotification, props.flashcard.id]
  );

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

        <div className='flex justify-between'>
          <Button onClick={toggleAnswer}>Toggle Answer</Button>
          <div className='flex gap-3 justify-between items-stretch'>
            <Button onClick={toggleModal}>Edit</Button>
            <button
              onClick={deleteThisCard}
              className='justify-center items-center rounded-md  border-gray-800 bg-gray-300 hover:bg-gray-400 px-4 py-2 shadow-md transition-all ease-in-out active:transform active:scale-95'
            >
              <FontAwesomeIcon
                icon={faTrashCan}
                className='fa-xl'
              ></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </Card>
      {modalVisible && (
        <>
          <div
            className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 hover:cursor-pointer'
            onClick={toggleModal}
          ></div>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2'>
            <FlashcardEdit flashcard={props.flashcard}></FlashcardEdit>
          </div>
        </>
      )}
    </>
  );
}
