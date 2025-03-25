export interface CartItem {
  bookId: number;
  title: string;
  price: number;
  author: string;
  publisher: string;
  isbn: string;
  classification: string;
  category: string;
  pageCount: number;
  totalPrice: number;
  quantity: number; // Add a quantity field to the cart item
}
