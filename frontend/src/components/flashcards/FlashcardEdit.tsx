import { Flashcard } from '@/services/api';
import { FunctionComponent } from 'react';
import Card from '../base/Card';
import { TextArea } from '../base/TextArea';
import Button from '../base/Button';

interface EditModalProps {
  flashcard: Flashcard;
}

const EditModal: FunctionComponent<EditModalProps> = () => {
  const submitForm = () => {};

  return (
    <>
      <Card>
        <h1>Editing Card</h1>
        <form action={submitForm} className='flex flex-col gap-6'>
          <div className='flex flex-col gap-2'>
            <span className='text-2xl'>Question</span>
            <TextArea name='question' rows={2} />
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-2xl'>Answer</span>
            <TextArea name='answer' rows={2} />
          </div>
          <div className='flex justify-between'>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default EditModal;
