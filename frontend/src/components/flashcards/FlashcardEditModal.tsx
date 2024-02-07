import { FunctionComponent, MouseEventHandler } from 'react';
import FlashcardEdit from './FlashcardEdit';
import { Flashcard } from '@/services/api';

interface FlashcardEditModalProps {
  toggleModal: MouseEventHandler<HTMLDivElement>;
  flashcard: Flashcard;
}

const FlashcardEditModal: FunctionComponent<FlashcardEditModalProps> = ({
  toggleModal,
  flashcard,
}) => {
  return (
    <>
      <div
        className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 hover:cursor-pointer'
        onClick={toggleModal}
      ></div>
      <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2'>
        <FlashcardEdit flashcard={flashcard}></FlashcardEdit>
      </div>
    </>
  );
};

export default FlashcardEditModal;
