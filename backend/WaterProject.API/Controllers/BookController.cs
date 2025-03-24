using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers;
[Route("api/[controller]")]
[ApiController]

public class BookController : ControllerBase
{
    private BookDbContext _bookContext;
    
    public BookController(BookDbContext temp) => _bookContext = temp;

    [HttpGet("AllBooks")]
    public IActionResult Get(int pageHowMany = 5, int pageNum = 1, [FromQuery] List<string>? Category = null)
    {
        var query = _bookContext.Books.AsQueryable();

        if (Category != null && Category.Any())
        {
            query = query.Where(b => Category.Contains(b.Category));
        }
        
        var totalNumBooks = query.Count();
        
        var something = query
            .Skip((pageNum-1)*pageHowMany)
            .Take(pageHowMany)
            .ToList();
        

        var someObject = new { Books = something, TotalNumBooks = totalNumBooks };

        return Ok(someObject);
    }

    [HttpGet("GetBookByCategory")]
    public IActionResult GetBookByCategory(int pageHowMany = 5, int pageNum = 1)
    {
        var bookCategories = _bookContext.Books
            .Select(b => b.Category)
            .Distinct()
            .ToList();
        return Ok(bookCategories);
    }
}

