'use server';

import { revalidateTag } from 'next/cache';
import config from './config';

export interface Flashcard {
  id?: number;
  question: string;
  answer: string;
}

export async function fetchFlashcardsJSON(): Promise<Flashcard[]> {
  const response = await fetch(`${config.apiUrl}/flashcards`, {
    next: {
      tags: ['flashcards'],
    },
  });
  if (!response.ok) {
    throw new Error('Data fetching failed');
  }
  return await response.json();
}

export async function postNewFlashcard(
  flashcard: Flashcard
): Promise<Flashcard> {
  const response = await fetch(`${config.apiUrl}/flashcards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(flashcard),
  });

  if (!response.ok) {
    throw new Error('Failed to post new flashcard');
  }

  revalidateTag('flashcards');
  return await response.json();
}

export async function deleteFlashcard(id: number): Promise<void> {
  const response = await fetch(`${config.apiUrl}/flashcards/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete flashcard with id ${id}`);
  }

  revalidateTag('flashcards');
}
