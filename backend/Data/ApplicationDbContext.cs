using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class ApplicationDbContext : DbContext
{
    // The constructor receives the database configuration
    // from ASP.NET Core's dependency injection system.
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // This represents the Clients table in our database.
    //
    // Client = C# model
    // Clients = database table

    // Represents the Clients table.
    public DbSet<Client> Clients => Set<Client>();

    // Represents the Invoices table
    public DbSet<Invoice> Invoices => Set<Invoice>();

    // Represents the Users table.
    public DbSet<User> Users => Set<User>();
}