'use client';

import Card from '@/components/Card';
import { TextArea } from '../../components/TextArea';
import Button from '@/components/Button';
import { Flashcard, postNewFlashcard } from '@/services/api';
import { useNotifications } from '@/components/notifications/NotificationContext';

export default function NewFlashcardForm() {
  const { addNotification } = useNotifications();

  const submitForm = async (formdata: FormData) => {
    let flashcard: Flashcard = {
      question: formdata.get('question') as string,
      answer: formdata.get('answer') as string,
    };
    try {
      flashcard = await postNewFlashcard(flashcard);
      addNotification({
        message: 'Added Card',
        type: 'success',
      });
    } catch (error) {
      addNotification({
        message: 'Failed to Add Card',
        type: 'failure',
      });
    }
  };

  return (
    <>
      <Card>
        <form action={submitForm} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <span className='text-2xl'>Question</span>
            <TextArea name='question' />{' '}
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-2xl'>Answer</span>
            <TextArea name='answer' />{' '}
          </div>
          <div className='flex justify-between'>
            <Button text='Submit' type='submit'></Button>
          </div>
        </form>
      </Card>
    </>
  );
}
