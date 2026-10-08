// Gives us access to ASP.NET Core MVC features,
// including ControllerBase, IActionResult, and attributes
// such as [ApiController], [HttpGet], and [Route].
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ClientsController : ControllerBase
{
    // Gives the controller access to the database.
    private readonly ApplicationDbContext _context;

    // ASP.NET Core automatically provides our DbContext here.
    public ClientsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: /api/clients
    //
    // Gets every client for a collector from the Clients table.
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Client>>> GetClients()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        var clients = await _context.Clients
            .Where(c => c.CollectorId == int.Parse(userId))
            .ToListAsync();

        return Ok(clients);
    }

    // GET: /api/clients/1
    //
    // Gets one client based on their ID.
    [HttpGet("{id}")]
    public async Task<ActionResult<Client>> GetClient(int id)
    {
        var client = await _context.Clients.FindAsync(id);

        // If no client with that ID exists,
        // return HTTP 404 Not Found.
        if (client == null)
        {
            return NotFound();
        }

        return Ok(client);
    }

    // POST: /api/clients
    //
    // Creates a new client.
    [HttpPost]
    public async Task<ActionResult<Client>> CreateClient(Client client)
    {
        // Add the client to the database context.
        _context.Clients.Add(client);

        // Save the changes to PostgreSQL.
        await _context.SaveChangesAsync();

        // Return HTTP 201 Created.
        return CreatedAtAction(
            nameof(GetClient),
            new { id = client.Id },
            client
        );
    }

    // PUT: /api/clients/1
    //
    // Updates an existing client.
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateClient(int id, Client client)
    {
        // Make sure the ID in the URL matches
        // the ID of the client we're updating.
        if (id != client.Id)
        {
            return BadRequest();
        }

        _context.Entry(client).State = EntityState.Modified;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: /api/clients/1
    //
    // Deletes an existing client.
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteClient(int id)
    {
        var client = await _context.Clients.FindAsync(id);

        if (client == null)
        {
            return NotFound();
        }

        _context.Clients.Remove(client);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}