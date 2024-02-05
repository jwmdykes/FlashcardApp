using Microsoft.EntityFrameworkCore;

var myCors = "_allowNextJSDevelopmentApp";
var builder = WebApplication.CreateBuilder(args);

// Configure CORS only for development.
// In production, we just make sure the api is on the same origin
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: myCors,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
    });
}

builder.Services.AddDbContext<FlashcardDb>(options => options.UseNpgsql("Host=127.0.0.1;Username=flashcard_app;Password=flashcard_app;Database=flashcard_app"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
var app = builder.Build();

app.MapGet("/flashcards", async (FlashcardDb db) =>
{
    return await db.Flashcards.ToListAsync();
});

app.MapGet("/flashcards/{id}", async (Guid id, FlashcardDb db) =>
{
    return await db.Flashcards.FindAsync(id)
        is Flashcard flashcard
            ? Results.Ok(flashcard)
            : Results.NotFound();
});

app.MapPost("/flashcards", async (FlashcardDto flashcard, FlashcardDb db) =>
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

    return Results.Created($"/flashcards/{new_flashcard.Id}", flashcard);
});

app.MapPut("/flashcards/{id}", async (Guid id, FlashcardDto inputFlashcard, FlashcardDb db) =>
{
    var flashcard = await db.Flashcards.FindAsync(id);

    if (flashcard is null) return Results.NotFound();

    flashcard.Question = inputFlashcard.Question;
    flashcard.Answer = inputFlashcard.Answer;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapDelete("/flashcards/{id}", async (Guid id, FlashcardDb db) =>
{
    if (await db.Flashcards.FindAsync(id) is Flashcard flashcard)
    {
        db.Flashcards.Remove(flashcard);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

if (app.Environment.IsDevelopment())
{
    app.UseCors(myCors);
}
app.Run();