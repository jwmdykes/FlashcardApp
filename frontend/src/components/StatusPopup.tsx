'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';

export interface StatusPopupProps {
  message: string;
  type: 'success' | 'failure' | '';
}

export default function StatusPopup({ message, type }: StatusPopupProps) {
  return (
    <AnimatePresence>
      <motion.div
        key={message !== '' ? 'visible' : 'hidden'}
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-0 right-0 m-4 px-6 py-6 rounded-md shadow-md font-medium border-b-4 ${
          type === 'success'
            ? 'bg-green-200 border-green-400'
            : 'bg-red-200 border-red-400'
        }
        ${message !== '' ? 'visible' : 'hidden'}`}
      >
        <div className='flex justify-between items-center gap-4'>
          <div
            className={`flex justify-center items-center rounded-full h-8 w-8 ${
              type === 'success' ? 'bg-green-400' : 'bg-red-400'
            }`}
          >
            <FontAwesomeIcon
              icon={type === 'success' ? faCheck : faX}
              className='text-white'
            ></FontAwesomeIcon>
          </div>
          {message}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
