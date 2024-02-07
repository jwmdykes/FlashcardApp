using Microsoft.EntityFrameworkCore;

var myCors = "_allowNextJSDevelopmentApp";
var builder = WebApplication.CreateBuilder(args);

// Configure CORS for development.
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(
            name: myCors,
            policy =>
            {
                policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
            }
        );
    });
}

builder.Services.AddDbContext<FlashcardDb>(options =>
    options.UseNpgsql(
        "Host=127.0.0.1;Username=flashcard_app;Password=flashcard_app;Database=flashcard_app"
    )
);
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
var app = builder.Build();

app.MapFlashcards();

if (app.Environment.IsDevelopment())
{
    app.UseCors(myCors);
}
app.Run();
