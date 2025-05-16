// Controllers/TodoController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly TodoContext _context;

    public TodoController(TodoContext context) => _context = context;

    [HttpGet]
    public async Task<IEnumerable<TodoTask>> Get() =>
        await _context.TodoTasks.ToListAsync();

    [HttpPost]
    public async Task<IActionResult> Post(TodoTask item)
    {
        _context.TodoTasks.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, TodoTask item)
    {
        if (id != item.Id) return BadRequest();
        _context.Entry(item).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var item = await _context.TodoTasks.FindAsync(id);
        if (item == null) return NotFound();
        _context.TodoTasks.Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
