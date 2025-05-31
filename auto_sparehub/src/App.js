import React, { useState } from 'react';
import './App.css';
import Catalog from './components/Catalog';

/**
 * PUBLIC_INTERFACE
 * Main application shell for AutoSpareHub:
 * - Top navbar: logo, search, user account, cart
 * - Left sidebar: filters
 * - Main content: grid catalog, or respective view (cart, account, checkout)
 * Navigation is handled via client state (no router for this version).
 */
function App() {
  // App navigation: "catalog" | "cart" | "account" | "checkout"
  const [view, setView] = useState("catalog");

  // Simple handlers to simulate navigation (subsequent implementation will update these)
  const goToCatalog = () => setView("catalog");
  const goToCart = () => setView("cart");
  const goToAccount = () => setView("account");
  const goToCheckout = () => setView("checkout");

  return (
    <div className="app">
      <nav className="navbar">
        {/* Logo and search left, nav actions right */}
        <div className="navbar-section navbar-left">
          <div className="navbar-logo" onClick={goToCatalog} role="button" tabIndex={0}>
            <span className="logo-icon" aria-label="AutoSpareHub Logo">🚗</span>
            <span className="logo-text">AutoSpareHub</span>
          </div>
          <form className="navbar-search" onSubmit={e => { e.preventDefault(); /* implement search*/ }}>
            <input
              className="search-input"
              type="text"
              placeholder="Search spare parts..."
              aria-label="Search spare parts"
            />
            <button className="search-btn" type="submit">🔍</button>
          </form>
        </div>
        <div className="navbar-section navbar-right">
          <button
            className="icon-btn"
            title="Account"
            aria-label="Account"
            onClick={goToAccount}
          >
            <span className="icon-account" role="img" aria-label="User">&#128100;</span>
          </button>
          <button
            className="icon-btn"
            title="Cart"
            aria-label="Cart"
            onClick={goToCart}
          >
            <span className="icon-cart" role="img" aria-label="Cart">&#128722;</span>
            {/* Cart count badge, placeholder (to be implemented with state) */}
            {/* <span className="cart-count-badge">2</span> */}
          </button>
        </div>
      </nav>

      <div className="main-layout">
        {/* Sidebar for filters, shown on catalog only for now */}
        <aside className={`sidebar${view === "catalog" ? "" : " sidebar-hidden"}`}>
          <div className="sidebar-title">Filters</div>
          <div className="sidebar-content">
            {/* Placeholder - actual filter components come later */}
            <div className="filter-group">
              <div className="filter-label">Category</div>
              <select className="filter-select">
                <option>All Categories</option>
              </select>
            </div>
            <div className="filter-group">
              <div className="filter-label">Brand</div>
              <select className="filter-select">
                <option>All Brands</option>
              </select>
            </div>
            <div className="filter-group">
              <div className="filter-label">Price</div>
              <input className="filter-input" type="range" min="0" max="1000" step="10" />
            </div>
          </div>
        </aside>

        <main className="main-content">
          {/* Conditional rendering for "routes" */}
          {view === "catalog" && (
            <Catalog onAddToCart={goToCart} />
          )}
          {view === "cart" && (
            <section className="cart-section">
              <h2>Cart (preview)</h2>
              <p>Your cart is empty.</p>
              <button className="btn" onClick={goToCheckout}>Proceed to Checkout</button>
              <button className="btn btn-secondary" onClick={goToCatalog}>Back to Catalog</button>
            </section>
          )}
          {view === "checkout" && (
            <section className="checkout-section">
              <h2>Checkout (preview)</h2>
              <p>Checkout flow placeholder.</p>
              <button className="btn btn-secondary" onClick={goToCatalog}>Cancel</button>
            </section>
          )}
          {view === "account" && (
            <section className="account-section">
              <h2>My Account (preview)</h2>
              <p>Account and order management (simulated).</p>
              <button className="btn btn-secondary" onClick={goToCatalog}>Back to Catalog</button>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;