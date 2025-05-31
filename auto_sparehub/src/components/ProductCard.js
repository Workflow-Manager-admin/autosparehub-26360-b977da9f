import React from 'react';
import '../App.css';

/**
 * PUBLIC_INTERFACE
 * ProductCard component - displays a single product in the catalog grid.
 * Props: 
 *  - name: string (product name)
 *  - price: string/number (product price)
 *  - onAddToCart: function (handler for Add to Cart)
 *  - image: (optional placeholder for now)
 */
/**
 * PUBLIC_INTERFACE
 * ProductCard component - displays a single product in the catalog grid.
 * Props: 
 *  - product: object (the actual product, includes id, name, price, brand, etc)
 *  - name: string (used for backward compatibility, product.name preferred)
 *  - price: string/number (used for backward compatibility, product.price preferred)
 *  - onAddToCart: function (handler for Add to Cart)
 *  - image: (optional placeholder for now)
 */
function ProductCard({ product, name = "Product Name", price = "$99.00", onAddToCart }) {
  // Prefer product fields if given
  const displayName = product ? product.name : name;
  const displayPrice = product
    ? typeof product.price === "number"
      ? `$${product.price}`
      : product.price
    : price;

  return (
    <div className="product-card">
      <div className="product-img-placeholder">Image</div>
      <div className="product-details">
        <div className="product-title">{displayName}</div>
        <div className="product-price">{displayPrice}</div>
        <button className="btn btn-small" onClick={onAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
