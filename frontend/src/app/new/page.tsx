import Main from "@/components/Main";
import NewFlashcardForm from "../../components/flashcards/NewFlashcardForm";

export default function createCard() {
  return (
    <Main>
      <h1>Create New Flashcard</h1>
      <NewFlashcardForm></NewFlashcardForm>
    </Main>
  );
}
