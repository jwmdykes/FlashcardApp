'use client';

import Card from '@/components/Card';
import { TextArea } from '../../components/TextArea';
import Button from '@/components/Button';
import { useState } from 'react';
import { Flashcard, postNewFlashcard } from '@/services/api';
import StatusPopup, { StatusPopupProps } from '@/components/StatusPopup';

export default function NewFlashcardForm() {
  const [notification, setNotification] = useState<StatusPopupProps>({
    message: '',
    type: '',
  });

  const submitForm = async (formdata: FormData) => {
    setNotification({ message: '', type: '' });
    let flashcard: Flashcard = {
      question: formdata.get('question') as string,
      answer: formdata.get('answer') as string,
    };
    try {
      flashcard = await postNewFlashcard(flashcard);
      console.log('New flashcard created', flashcard);
      setNotification({ message: 'Card Created', type: 'success' });
    } catch (error) {
      console.error('Failed to create new flashcard', error);
      setNotification({ message: 'Card Creation Failed', type: 'failure' });
    } finally {
      setTimeout(() => setNotification({ message: '', type: '' }), 3000);
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
      <StatusPopup
        type={notification.type}
        message={notification.message}
      ></StatusPopup>
    </>
  );
}
