namespace backend.Models;
public class Invoice
{
    public int Id { get; set; }

    public string InvoiceNumber { get; set; } = string.Empty;

    public string EngagementNumber { get; set; } = string.Empty;

    public int ClientId { get; set; }

    public DateOnly InvoiceDate { get; set; }

    public DateOnly DueDate { get; set; }

    public decimal Amount { get; set; }

    public string Status { get; set; } = string.Empty;

    public Client? Client { get; set; }
}