const baseUrl = 'http://localhost:5111';

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
}

export async function fetchFlashcards(): Promise<Flashcard[]> {
  const response = await fetch(`${baseUrl}/flashcards`);
  if (!response.ok) {
    throw new Error('Data fetching failed');
  }
  return await response.json();
}
