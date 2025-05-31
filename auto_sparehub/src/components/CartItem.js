import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
/**
 * CartItem displays a product in the cart with quantity controls.
 * Props:
 *  - product: object (with { id, name, price, ... })
 *  - quantity: number
 *  - onQuantityChange: function(newQuantity)
 *  - onRemove: function
 */
function CartItem({ product, quantity, onQuantityChange, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <div className="cart-item-title">{product.name}</div>
        <div className="cart-item-brand">{product.brand}</div>
      </div>
      <div className="cart-item-controls">
        <div className="cart-item-qty">
          <button
            className="btn btn-small cart-qty-btn"
            aria-label="Decrease quantity"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >-</button>
          <input
            type="number"
            className="cart-qty-input"
            value={quantity}
            min={1}
            onChange={(e) =>
              onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))
            }
            aria-label="Item quantity"
          />
          <button
            className="btn btn-small cart-qty-btn"
            aria-label="Increase quantity"
            onClick={() => onQuantityChange(quantity + 1)}
          >+</button>
        </div>
        <div className="cart-item-total">
          ${(product.price * quantity).toFixed(2)}
        </div>
        <button
          className="btn btn-small btn-secondary cart-remove-btn"
          aria-label="Remove from cart"
          onClick={onRemove}
        >Remove</button>
      </div>
    </div>
  );
}

export default CartItem;
