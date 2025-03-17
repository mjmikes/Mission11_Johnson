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
    public IActionResult Get(int pageHowMany = 5, int pageNum = 1)
    {
        var something = _bookContext.Books
            .Skip((pageNum-1)*pageHowMany)
            .Take(pageHowMany)
            .ToList();
        
        var totalNumBooks = _bookContext.Books.Count();

        var someObject = new { Books = something, TotalNumBooks = totalNumBooks };

        return Ok(someObject);
    }
}