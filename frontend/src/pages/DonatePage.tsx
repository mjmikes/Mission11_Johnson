import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function DonatePage() {
  const navigate = useNavigate();
  const { title, bookId, price } = useParams<{
    title: string;
    bookId: string;
    price?: string;
  }>();
  const { addToCart } = useCart();
  const numericalPrice = price ? parseFloat(price) : 0; // Safely parse price or default to 0
  const [totalPrice, setTotalPrice] = useState<number>(numericalPrice);

  useEffect(() => {
    // If the price parameter changes, update totalPrice
    setTotalPrice(numericalPrice);
  }, [numericalPrice]);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No Book Found',
      price: numericalPrice,
      author: '',
      publisher: '',
      isbn: '',
      classification: '',
      category: '',
      pageCount: 0,
      totalPrice: totalPrice,
      quantity: 0,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Purchase {title}</h2>
      <div>
        <label>Price: </label>
        <p>${totalPrice.toFixed(2)}</p>{' '}
        {/* Display the price as a formatted string */}
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <button onClick={() => navigate('/books')}>Go Back</button>
    </>
  );
}

export default DonatePage;
