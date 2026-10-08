namespace backend.Models;

public class Client
{
    // Unique identifier for the client.
    // This will eventually become the primary key
    // in our PostgreSQL database.
    public int Id { get; set; }

    // The client's/company's name.
    public string Name { get; set; } = string.Empty;

    // The client's email address.
    public string Email { get; set; } = string.Empty;

    // The client's phone number.
    // ? means this field is optional.
    public string? Phone { get; set; }

    // The client's segment.
    public string CustomerSegment { get; set; } = string.Empty;
    
    public int CollectorId { get; set; }
    
    public User? Collector { get; set; }
}