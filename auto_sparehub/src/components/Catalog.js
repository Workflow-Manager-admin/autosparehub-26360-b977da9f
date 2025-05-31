import React from 'react';
import ProductCard from './ProductCard';
import '../App.css';

/**
 * PUBLIC_INTERFACE
 * Catalog component - displays the catalog grid of ProductCards.
 * Props:
 *  - products: array of product objects ({id, name, price, ...}) - optional for backward-compatibility
 *  - onAddToCart: function (passed to each ProductCard)
 */
function Catalog({ products, onAddToCart }) {
  // If products prop passed, use it; else fallback to placeholder
  const items = products && products.length > 0
    ? products
    : Array.from({ length: 8 }).map((_, idx) => ({
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
        {items.length > 0 ? (
          items.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              name={product.name}
              price={typeof product.price === 'number' ? `$${product.price}` : product.price}
              onAddToCart={() => onAddToCart(product)}
            />
          ))
        ) : (
          <div>No products found matching your criteria.</div>
        )}
      </div>
    </section>
  );
}

export default Catalog;
