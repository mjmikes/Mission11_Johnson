import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import ProjectList from '../components/BookList';
import { useState } from 'react';
import CartSummary from '../components/CartSummary';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <>
      <div className="container">
        <div>
          <CartSummary />
          <WelcomeBand />
        </div>
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-md-9">
            <ProjectList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BooksPage;
