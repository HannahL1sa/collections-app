using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class InvoicesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public InvoicesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: /api/invoices
    // Gets every invoice for a collector from the Invoices table.
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
    {
        var invoices = await _context.Invoices
            .Include(i => i.Client)
            .ToListAsync();

        return Ok(invoices);
    }

    // PUT: /api/invoices/1/follow-ups
    // Records the date the client was contacted.

    /*
    [HttpPut("{id}/follow-ups")]
    public async Task<IActionResult> UpdateLastContact(int id)
    {
        var invoice = await _context.Invoices.FindAsync(id);

        if (invoice == null)
        {
            return NotFound();
        }

        // Record the date of the communication
        invoice.LastContact = DateOnly.FromDateTime(DateTime.UtcNow);

        // Move to the next communication stage
        invoice.CommunicationStage++;

        await _context.SaveChangesAsync();

        //return Ok(invoice.LastContact);
        return Ok(new
        {
            lastContact = invoice.LastContact,
            communicationStage = invoice.CommunicationStage
        });
    }
    */
    [HttpPut("{id}/follow-ups")]
public async Task<IActionResult> UpdateLastContact(int id)
{
    var invoice = await _context.Invoices.FindAsync(id);

    if (invoice == null)
    {
        return NotFound();
    }

    var today = DateOnly.FromDateTime(DateTime.UtcNow);

    invoice.LastContact = today;

    invoice.CommunicationStage++;

    if (invoice.CommunicationStage < 3)
    {
        invoice.NextContactDate = today.AddDays(10);
    }
    else
    {
        invoice.NextContactDate = null;
    }

    await _context.SaveChangesAsync();

    return Ok(new
    {
        lastContact = invoice.LastContact,
        communicationStage = invoice.CommunicationStage,
        nextContactDate = invoice.NextContactDate
    });
}
}