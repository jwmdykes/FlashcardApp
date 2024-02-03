'use client';

import Card from '@/components/Card';
import { TextArea } from '../../components/TextArea';
import Button from '@/components/Button';
import { useState } from 'react';
import { Flashcard, postNewFlashcard } from '@/services/api';

export default function NewFlashcardForm() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState<boolean | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);

  const submitForm = async () => {
    setSubmitSuccess(null);
    setIsSubmitting(true);
    const startTime = Date.now();
    let flashcard: Flashcard = {
      question: question,
      answer: answer,
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
      <div className='flex flex-col gap-2'>
        <span className='text-2xl'>Question</span>
        <TextArea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />{' '}
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-2xl'>Answer</span>
        <TextArea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />{' '}
      </div>
      <div className='flex justify-between'>
        <Button callback={submitForm} text='Submit'></Button>
        {isSubmitting && (
          <div className='flex justify-center items-center'>Submitting...</div>
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
    </Card>
  );
}
