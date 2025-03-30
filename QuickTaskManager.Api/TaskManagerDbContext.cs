using Microsoft.EntityFrameworkCore;

public class TaskManagerDbContext : DbContext
{
    public TaskManagerDbContext(DbContextOptions<TaskManagerDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Task> Tasks { get; set; }
}