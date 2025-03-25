import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Card, Button, Modal } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  const handleRemoveClick = (item: CartItem) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const confirmRemove = () => {
    if (selectedItem) {
      removeFromCart(selectedItem.bookId);
      setShowModal(false);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <Accordion defaultActiveKey="0">
          {cart.map((item) => (
            <Card key={item.bookId}>
              <Accordion.Item eventKey={item.bookId.toString()}>
                <Accordion.Header>
                  {item.title} - ${item.price.toFixed(2)} x {item.quantity} = $
                  {item.totalPrice.toFixed(2)}
                </Accordion.Header>
                <Accordion.Collapse eventKey={item.bookId.toString()}>
                  <Card.Body>
                    <div>
                      <strong>Price per item:</strong> ${item.price.toFixed(2)}
                    </div>
                    <div>
                      <strong>Total Price:</strong>
                      {item.totalPrice.toFixed(2)}
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveClick(item)}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Accordion.Collapse>
              </Accordion.Item>
            </Card>
          ))}
        </Accordion>
      )}
      <div className="mt-3">
        <Button variant="primary" onClick={() => navigate('/checkout')}>
          Checkout
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate('/books')}
          className="ml-2"
        >
          Continue Shopping
        </Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove {selectedItem?.title} from the cart?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={confirmRemove}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CartPage;
