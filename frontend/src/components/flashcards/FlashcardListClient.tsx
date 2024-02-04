'use client';

import { Flashcard } from '@/services/api';
import { AnimatePresence, motion } from 'framer-motion';
import FlashcardCard from './FlashcardCard';

export interface FlashcardListClientProps {
  flashcards: Flashcard[];
}

export default function FlashcardListClient({
  flashcards,
}: FlashcardListClientProps) {
  return (
    <AnimatePresence>
      {flashcards.map((flashcard) => (
        <motion.div
          key={flashcard.id}
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
          layout
          transition={{ duration: 0.3 }}
        >
          <FlashcardCard key={flashcard.id} flashcard={flashcard} />
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
