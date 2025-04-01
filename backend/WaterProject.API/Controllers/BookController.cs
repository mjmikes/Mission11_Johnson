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

    [HttpPost("AddBook")]
    public IActionResult AddBook([FromBody]Book newBook) {
        _bookContext.Books.Add(newBook);
        _bookContext.SaveChanges();
        return Ok(newBook);
    }

    [HttpPut("UpdateBook/{bookId}")]
    public IActionResult UpdateBook(int bookId, [FromBody]Book updatedBook) {
        var book = _bookContext.Books.Find(bookId);

        book.Title = updatedBook.Title;
        book.Author = updatedBook.Author;
        book.Publisher = updatedBook.Publisher;
        book.ISBN = updatedBook.ISBN;
        book.Classification = updatedBook.Classification;
        book.Category = updatedBook.Category;
        book.PageCount = updatedBook.PageCount;
        book.Price = updatedBook.Price;
        _bookContext.Books.Update(book);
        _bookContext.SaveChanges();
        return Ok(book);
    }

    [HttpDelete("DeleteBook/{bookId}")]
    public IActionResult DeleteBook(int bookId) {
        var book = _bookContext.Books.Find(bookId);

        if (book == null) {
            return NotFound();
        }   
        _bookContext.Books.Remove(book);
        _bookContext.SaveChanges();
        return NoContent();
    }
}

