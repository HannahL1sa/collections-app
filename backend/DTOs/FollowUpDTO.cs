// Define a data transfer object (DTO). 
// A DTO is an object that defines how the data will be sent over the network. 
namespace backend.DTOs;

public class FollowUpDTO
{
    public int Id { get; set; }

    public string ClientName { get; set; } = string.Empty;

    public string InvoiceNumber { get; set; } = string.Empty;

    public DateOnly DueDate { get; set; }

    public decimal Amount { get; set; }

    public string Status { get; set; } = string.Empty;

    public DateTime? LastContact { get; set; }
}