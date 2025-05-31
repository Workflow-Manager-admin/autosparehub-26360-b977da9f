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
function ProductCard({ name = "Product Name", price = "$99.00", onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-img-placeholder">Image</div>
      <div className="product-details">
        <div className="product-title">{name}</div>
        <div className="product-price">{price}</div>
        <button className="btn btn-small" onClick={onAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
