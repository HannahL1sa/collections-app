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

    /*
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

                ClientEmail = _context.Clients
                    .Where(client => client.Id == invoice.ClientId)
                    .Select(client => client.Email)
                    .FirstOrDefault() ?? "",

                ClientPhone = _context.Clients
                    .Where(client => client.Id == invoice.ClientId)
                    .Select(client => client.Phone)
                    .FirstOrDefault() ?? "",

                InvoiceNumber = invoice.InvoiceNumber,
                DueDate = invoice.DueDate,
                Amount = invoice.Amount,

                Status = invoice.DueDate < today
                    ? "Overdue"
                    : "Due Today",

                LastContact = invoice.LastContact
        })
        
        .ToListAsync();

        return Ok(followUps);
    }
    */
    [HttpGet("today")]
    public async Task<ActionResult<IEnumerable<FollowUpDTO>>> GetTodaysFollowUps()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        var collectorId = int.Parse(userId);

        var today = DateOnly.FromDateTime(DateTime.UtcNow);

        var followUps = await _context.Invoices
            .Where(invoice =>
                invoice.Client.CollectorId == collectorId &&
                invoice.Status != "Paid" &&
                invoice.DueDate <= today
            )
            .Select(invoice => new FollowUpDTO
            {
                Id = invoice.Id,
                ClientName = invoice.Client!.Name,
                ClientEmail = invoice.Client!.Email,
                ClientPhone = invoice.Client!.Phone ?? "",
                InvoiceNumber = invoice.InvoiceNumber,
                DueDate = invoice.DueDate,
                Amount = invoice.Amount,

                Status = invoice.DueDate < today
                    ? "Overdue"
                    : "Due Today",

                LastContact = invoice.LastContact,

                CommunicationStage = invoice.CommunicationStage,

                NextContactDate = invoice.NextContactDate
            })
            .ToListAsync();

        return Ok(followUps);
    }
}