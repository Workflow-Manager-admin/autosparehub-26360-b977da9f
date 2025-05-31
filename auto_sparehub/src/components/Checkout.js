import React, { useState } from "react";
import "../App.css";

/**
 * PUBLIC_INTERFACE
 * Checkout Component: Handles a multi-step checkout process (Shipping, Payment, Confirmation).
 * Props:
 *  - cart: Array of cart item objects ({product, quantity})
 *  - onBackToCatalog: function to navigate back to the catalog
 *  - onCheckoutComplete: function when order is confirmed (optional)
 */
function Checkout({ cart = [], onBackToCatalog, onCheckoutComplete }) {
  // Checkout steps
  const STEP_SHIPPING = 0;
  const STEP_PAYMENT = 1;
  const STEP_CONFIRM = 2;

  const [step, setStep] = useState(STEP_SHIPPING);

  // Form state (mocked, and not validated for now)
  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    city: "",
    postal: "",
    phone: ""
  });
  const [payment, setPayment] = useState({
    cardNumber: "",
    nameOnCard: "",
    exp: "",
    cvv: ""
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber] = useState(() => Math.floor(100000 + Math.random() * 900000)); // random order number

  // Step navigation handlers
  function handleNextStep() {
    setStep(prev => Math.min(prev + 1, STEP_CONFIRM));
  }
  function handlePrevStep() {
    setStep(prev => Math.max(prev - 1, STEP_SHIPPING));
  }

  // Placeholder for shipping address submit
  function handleShippingSubmit(e) {
    e.preventDefault();
    handleNextStep();
  }

  // Placeholder for payment submit
  function handlePaymentSubmit(e) {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      handleNextStep();
      if (onCheckoutComplete) onCheckoutComplete();
    }, 950); // fake delay
  }

  // Controlled input logic
  function handleShippingChange(e) {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value }));
  }
  function handlePaymentChange(e) {
    const { name, value } = e.target;
    setPayment(prev => ({ ...prev, [name]: value }));
  }

  // Cart summary helper
  function renderCartSummary() {
    return (
      <div className="checkout-cart-summary">
        <h4 style={{margin: "14px 0 7px 0"}}>Order Summary</h4>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {cart.map(({ product, quantity }) => (
            <li key={product.id} style={{marginBottom: 5, fontSize: 15}}>
              {product.name} x {quantity} <span style={{float: "right", color: "var(--accent-color)", fontWeight: 500}}>${(product.price * quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div style={{borderTop: "1px solid #eee", margin: "10px 0 0 0", paddingTop: 9, fontWeight: 600}}>
          Total: <span style={{float: "right"}}>${cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}</span>
        </div>
      </div>
    );
  }

  // Rendering step contents
  function renderShippingForm() {
    return (
      <form className="checkout-form" onSubmit={handleShippingSubmit} autoComplete="off">
        <h3>Shipping Address</h3>
        <div className="form-group">
          <label>Name</label>
          <input name="name" required value={shipping.name} onChange={handleShippingChange} />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input name="address" required value={shipping.address} onChange={handleShippingChange} />
        </div>
        <div className="form-group">
          <label>City</label>
          <input name="city" required value={shipping.city} onChange={handleShippingChange} />
        </div>
        <div className="form-group">
          <label>Postal Code</label>
          <input name="postal" required value={shipping.postal} onChange={handleShippingChange} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input name="phone" required value={shipping.phone} onChange={handleShippingChange} />
        </div>
        <div className="checkout-actions">
          <button type="button" className="btn btn-secondary" onClick={onBackToCatalog}>Cancel</button>
          <button type="submit" className="btn" style={{marginLeft: 9}}>Next: Payment</button>
        </div>
      </form>
    );
  }

  function renderPaymentForm() {
    return (
      <form className="checkout-form" onSubmit={handlePaymentSubmit} autoComplete="off">
        <h3>Payment Method</h3>
        <div className="form-group">
          <label>Card Number</label>
          <input name="cardNumber" required value={payment.cardNumber} onChange={handlePaymentChange} placeholder="1234 5678 9012 3456" maxLength={19}/>
        </div>
        <div className="form-group">
          <label>Name on Card</label>
          <input name="nameOnCard" required value={payment.nameOnCard} onChange={handlePaymentChange} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Exp.</label>
            <input name="exp" required value={payment.exp} onChange={handlePaymentChange} placeholder="MM/YY" maxLength={5}/>
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input name="cvv" required value={payment.cvv} onChange={handlePaymentChange} maxLength={4}/>
          </div>
        </div>
        <div className="checkout-actions">
          <button type="button" className="btn btn-secondary" onClick={handlePrevStep}>Back</button>
          <button type="submit" className="btn" disabled={isProcessing} style={{marginLeft: 9}}>
            {isProcessing ? "Processing..." : "Confirm Order"}
          </button>
        </div>
      </form>
    );
  }

  function renderConfirmation() {
    return (
      <div className="checkout-confirm">
        <h3>Thank you for your order!</h3>
        <p>Your order #{orderNumber} has been placed.</p>
        <div style={{marginBottom: 14}}>{renderCartSummary()}</div>
        <button className="btn" onClick={onBackToCatalog}>Return to Catalog</button>
      </div>
    );
  }

  // Step indicators
  const stepLabels = ["Shipping", "Payment", "Confirmation"];

  return (
    <section className="checkout-section">
      <h2>Checkout</h2>
      {/* Step progress bar */}
      <div className="checkout-stepper">
        {stepLabels.map((label, idx) => (
          <span
            key={label}
            className={
              "checkout-step" +
                (idx === step ? " checkout-step-active" : "") +
                (idx < step ? " checkout-step-done" : "")
            }
          >{label}</span>
        ))}
      </div>

      {/* Main step content */}
      <div className="checkout-main">
        {step === STEP_SHIPPING && (
          <div className="checkout-content">
            <div style={{flex: 2}}>{renderShippingForm()}</div>
            <div className="checkout-summary-box">{renderCartSummary()}</div>
          </div>
        )}
        {step === STEP_PAYMENT && (
          <div className="checkout-content">
            <div style={{flex: 2}}>{renderPaymentForm()}</div>
            <div className="checkout-summary-box">{renderCartSummary()}</div>
          </div>
        )}
        {step === STEP_CONFIRM && (
          <div className="checkout-content">
            <div style={{flex: 2}}>{renderConfirmation()}</div>
            <div className="checkout-summary-box">{renderCartSummary()}</div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Checkout;
