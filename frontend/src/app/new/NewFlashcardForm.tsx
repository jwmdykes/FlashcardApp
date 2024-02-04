'use client';

import Card from '@/components/Card';
import { TextArea } from '../../components/TextArea';
import Button from '@/components/Button';
import { useState } from 'react';
import { Flashcard, postNewFlashcard } from '@/services/api';

export default function NewFlashcardForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  const submitForm = async (formdata: FormData) => {
    setSubmitSuccess(null);
    setIsSubmitting(true);
    const startTime = Date.now();
    let flashcard: Flashcard = {
      question: formdata.get('question') as string,
      answer: formdata.get('answer') as string,
    };
    try {
      flashcard = await postNewFlashcard(flashcard);
      console.log('New flashcard created', flashcard);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Failed to create new flashcard', error);
      setSubmitSuccess(false);
    } finally {
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      const minDisplayTime = 200;

      if (elapsedTime < minDisplayTime) {
        setTimeout(() => {
          setIsSubmitting(false);
        }, minDisplayTime - elapsedTime);
      } else {
        setIsSubmitting(false);
      }
    }
  };

  return (
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
          {isSubmitting && (
            <div className='flex justify-center items-center'>
              Submitting...
            </div>
          )}
          {!isSubmitting && submitSuccess && (
            <div className='text-green-500 flex justify-center items-center'>
              Flashcard created successfully!
            </div>
          )}
          {!isSubmitting && submitSuccess === false && (
            <div className='text-red-500 flex justify-center items-center'>
              Failed to create flashcard. Please try again.
            </div>
          )}
        </div>
      </form>
    </Card>
  );
}
