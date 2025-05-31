import React from 'react';
import ProductCard from './ProductCard';
import '../App.css';

/**
 * PUBLIC_INTERFACE
 * Catalog component - displays the catalog grid of ProductCards.
 * Props:
 *  - onAddToCart: function (passed to each ProductCard)
 */
function Catalog({ onAddToCart }) {
  // Placeholder products for grid
  const placeholderProducts = Array.from({ length: 8 }).map((_, idx) => ({
    id: idx,
    name: `Product Name`,
    price: `$99.00`
  }));

  return (
    <section className="catalog-section">
      <div className="catalog-title">
        <h1>Find Spare Parts</h1>
        <span className="catalog-subtitle">
          The best selection of car spare parts at your fingertips.
        </span>
      </div>
      <div className="product-grid">
        {placeholderProducts.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}

export default Catalog;
