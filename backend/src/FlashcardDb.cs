using Microsoft.EntityFrameworkCore;

class FlashcardDb : DbContext
{
    public FlashcardDb(DbContextOptions<FlashcardDb> options) : base(options)
    {
    }

    public DbSet<Flashcard> Flashcards => Set<Flashcard>();
}