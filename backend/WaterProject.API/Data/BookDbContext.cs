using Microsoft.EntityFrameworkCore;

namespace WaterProject.API.Data;

public class BookDbContext : DbContext
{
    // Constructor for the WaterDbContext
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
    {
    }
        
    public DbSet<Book> Books { get; set; }
}
