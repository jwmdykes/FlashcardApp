"use server";

import Main from "../components/Main";
import FlashcardList from "../components/flashcards/FlashcardList";

export default async function Home() {
  return (
    <Main>
      <h1>Flashcards</h1>
      <FlashcardList></FlashcardList>
    </Main>
  );
}
