import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);

        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, selectedCategories]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
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
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/donate/${b.title}/${b.bookId}/${b.price}`)
              }
            >
              Buy
            </button>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </div>
  );
}

export default BookList;
