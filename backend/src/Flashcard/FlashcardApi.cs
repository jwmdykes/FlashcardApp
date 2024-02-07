using Microsoft.EntityFrameworkCore;

namespace backend;

internal static class FlashcardsApi
{
    public static RouteGroupBuilder MapFlashcards(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/flashcards");

        group.WithTags("Flashcards");

        group.MapGet(
            "/",
            async (FlashcardDb db) =>
            {
                return await db.Flashcards.ToListAsync();
            }
        );

        group.MapGet(
            "/{id}",
            async (Guid id, FlashcardDb db) =>
            {
                return await db.Flashcards.FindAsync(id) is Flashcard flashcard
                    ? Results.Ok(flashcard)
                    : Results.NotFound();
            }
        );

        group.MapPost(
            "/",
            async (FlashcardDto flashcard, FlashcardDb db) =>
            {
                var new_flashcard = new Flashcard()
                {
                    Answer = flashcard.Answer,
                    Question = flashcard.Question,
                    DateCreated = DateTime.UtcNow,
                    Id = Guid.NewGuid()
                };
                db.Flashcards.Add(new_flashcard);
                await db.SaveChangesAsync();

                return Results.Created($"/{new_flashcard.Id}", flashcard);
            }
        );

        group.MapPut(
            "/{id}",
            async (Guid id, FlashcardDto inputFlashcard, FlashcardDb db) =>
            {
                var flashcard = await db.Flashcards.FindAsync(id);

                if (flashcard is null)
                    return Results.NotFound();

                flashcard.Question = inputFlashcard.Question;
                flashcard.Answer = inputFlashcard.Answer;

                await db.SaveChangesAsync();
                return Results.NoContent();
            }
        );

        group.MapDelete(
            "/{id}",
            async (Guid id, FlashcardDb db) =>
            {
                if (await db.Flashcards.FindAsync(id) is Flashcard flashcard)
                {
                    db.Flashcards.Remove(flashcard);
                    await db.SaveChangesAsync();
                    return Results.NoContent();
                }

                return Results.NotFound();
            }
        );

        return group;
    }
}
