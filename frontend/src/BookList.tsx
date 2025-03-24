import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((category) => `category=${encodeURIComponent(category)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:5000/api/Book/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length > 0 ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, totalItems, selectedCategories]);

  // Sort books by title function
  const sortBooksByTitle = () => {
    const sortedBooks = [...books].sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase())
        return sortDirection === 'asc' ? -1 : 1;
      if (a.title.toLowerCase() > b.title.toLowerCase())
        return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    setBooks(sortedBooks);
    // Toggle sort direction for next use
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      <button onClick={sortBooksByTitle}>
        Sort by Title ({sortDirection === 'asc' ? 'Ascending' : 'Descending'})
      </button>
      <br />
      {books.map((b) => (
        <div id="BookCard" className="card">
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul>
              <li>
                <strong>Author:</strong> {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <li>
                <strong>Classification: </strong>
                {b.classification}
              </li>
              <li>
                <strong>Number of Pages:</strong> {b.pageCount}
              </li>
              <li>
                <strong>Price:</strong> {b.price}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(parseInt(e.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </div>
  );
}

export default BookList;
