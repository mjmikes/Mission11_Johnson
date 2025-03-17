using Microsoft.EntityFrameworkCore;

namespace WaterProject.API.Data
{
    public class WaterDbContext : DbContext
    {
        // Constructor for the WaterDbContext
        public WaterDbContext(DbContextOptions<WaterDbContext> options) : base(options)
        {
        }
        
        public DbSet<Project> Projects { get; set; }
    }
}

