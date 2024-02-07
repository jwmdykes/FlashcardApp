namespace backend;

public class FlashcardDto
{
    public string Question { get; set; } = string.Empty;
    public string Answer { get; set; } = string.Empty;
}

public class Flashcard : FlashcardDto
{
    public Guid Id { get; set; }
    public DateTime DateCreated { get; set; }
}
