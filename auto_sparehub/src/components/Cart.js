import React from "react";
import CartItem from "./CartItem";
import "../App.css";

// PUBLIC_INTERFACE
/**
 * Cart component
 * Props:
 *  - items: array of cart item objects ({ product, quantity })
 *  - onQuantityChange: function(productId, newQuantity)
 *  - onRemove: function(productId)
 *  - onCheckout: function
 *  - onClose: function
 */
function Cart({
  items = [],
  onQuantityChange,
  onRemove,
  onCheckout,
  onClose,
}) {
  const subtotal = items.reduce(
    (sum, item) =>
      sum + (item.product && typeof item.product.price === "number"
        ? item.product.price * item.quantity
        : 0),
    0
  );

  return (
    <div className="cart-drawer-overlay" role="dialog" aria-modal="true">
      <div className="cart-drawer">
        <div className="cart-drawer-header">
          <h2>Your Cart</h2>
          <button className="cart-drawer-close-btn" aria-label="Close cart" onClick={onClose}>&times;</button>
        </div>
        <div className="cart-drawer-content">
          {items.length === 0 ? (
            <div className="cart-empty">Your cart is empty.</div>
          ) : (
            items.map(({ product, quantity }) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={quantity}
                onQuantityChange={(qty) => onQuantityChange(product.id, qty)}
                onRemove={() => onRemove(product.id)}
              />
            ))
          )}
        </div>
        <div className="cart-drawer-footer">
          <div className="cart-subtotal">
            <span>Subtotal:</span>
            <b>${subtotal.toFixed(2)}</b>
          </div>
          <div className="cart-actions">
            <button
              className="btn"
              disabled={items.length === 0}
              onClick={onCheckout}
              aria-disabled={items.length === 0}
            >
              Proceed to Checkout
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
