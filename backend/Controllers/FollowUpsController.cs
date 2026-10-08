using backend.Data;
using backend.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class FollowUpsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public FollowUpsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("today")]
    public async Task<ActionResult<IEnumerable<FollowUpDTO>>> GetTodaysFollowUps()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        var collectorId = int.Parse(userId);

        //var today = DateTime.UtcNow.Date;
        var today = DateOnly.FromDateTime(DateTime.UtcNow);

        var followUps = await _context.Invoices
            .Where(invoice =>
                _context.Clients.Any(client =>
                client.Id == invoice.ClientId &&
                client.CollectorId == collectorId
            ) &&
                invoice.Status != "Paid" &&
                invoice.DueDate <= today
            )
            .Select(invoice => new FollowUpDTO
            {
                Id = invoice.Id,
                ClientName = _context.Clients
                    .Where(client => client.Id == invoice.ClientId)
                    .Select(client => client.Name)
                    .FirstOrDefault() ?? "",

                InvoiceNumber = invoice.InvoiceNumber,
                DueDate = invoice.DueDate,
                Amount = invoice.Amount,

                Status = invoice.DueDate < today
                    ? "Overdue"
                    : "Due Today",

                LastContact = null
        })
        .ToListAsync();

        return Ok(followUps);
    }
}