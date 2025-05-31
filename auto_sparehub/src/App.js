import React, { useState, useMemo } from 'react';
import './App.css';
import Catalog from './components/Catalog';
import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';

// Example data for demo: In real app this would come from backend/API/static data.
const MOCK_PRODUCTS = [
  {
    id: 1, name: "Brake Pad Set", price: 119, brand: "Brembo", category: "Brakes", compatibility: "Sedan",
  },
  {
    id: 2, name: "Oil Filter", price: 29, brand: "Bosch", category: "Engine", compatibility: "SUV",
  },
  {
    id: 3, name: "Headlight Bulb", price: 45, brand: "Philips", category: "Lights", compatibility: "Sedan",
  },
  {
    id: 4, name: "Air Filter", price: 31, brand: "Bosch", category: "Engine", compatibility: "Hatchback",
  },
  {
    id: 5, name: "Clutch Disc", price: 239, brand: "Valeo", category: "Transmission", compatibility: "SUV",
  },
  {
    id: 6, name: "Battery", price: 129, brand: "Amaron", category: "Electrical", compatibility: "Hatchback",
  },
  {
    id: 7, name: "Spark Plug", price: 17, brand: "NGK", category: "Engine", compatibility: "Sedan",
  },
  {
    id: 8, name: "Front Bumper", price: 310, brand: "OEM", category: "Body", compatibility: "SUV"
  },
];

const CATEGORY_OPTIONS = ["Brakes", "Engine", "Lights", "Transmission", "Electrical", "Body"];
const BRAND_OPTIONS = ["Brembo", "Bosch", "Philips", "Valeo", "Amaron", "NGK", "OEM"];
const COMPATIBILITY_OPTIONS = ["Sedan", "SUV", "Hatchback"];

const PRICE_RANGE = { min: 0, max: 350 };

function App() {
  // App navigation: "catalog" | "cart" | "account" | "checkout"
  const [view, setView] = useState("catalog");

  // Product state
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCompatibility, setSelectedCompatibility] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(PRICE_RANGE.max);

  // Simple handlers to simulate navigation
  const goToCatalog = () => setView("catalog");
  const goToCart = () => setView("cart");
  const goToAccount = () => setView("account");
  const goToCheckout = () => setView("checkout");

  // Handlers for filters and search
  const handleSearchChange = (e) => setSearchText(e.target.value);
  const handleSearchSubmit = (e) => { e.preventDefault(); }; // No-op, live updates

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleBrandChange = (e) => setSelectedBrand(e.target.value);
  const handleCompatibilityChange = (e) => setSelectedCompatibility(e.target.value);
  const handlePriceChange = (e) => setSelectedPrice(Number(e.target.value));

  // Filtering logic memoized for efficiency
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      if (
        (searchText && !(
          product.name.toLowerCase().includes(searchText.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchText.toLowerCase())
        )) ||
        (selectedCategory && product.category !== selectedCategory) ||
        (selectedBrand && product.brand !== selectedBrand) ||
        (selectedCompatibility && product.compatibility !== selectedCompatibility) ||
        product.price > selectedPrice
      ) {
        return false;
      }
      return true;
    });
  }, [searchText, selectedCategory, selectedBrand, selectedCompatibility, selectedPrice]);

  return (
    <div className="app">
      <nav className="navbar">
        {/* Logo and search left, nav actions right */}
        <div className="navbar-section navbar-left">
          <div className="navbar-logo" onClick={goToCatalog} role="button" tabIndex={0}>
            <span className="logo-icon" aria-label="AutoSpareHub Logo">🚗</span>
            <span className="logo-text">AutoSpareHub</span>
          </div>
          <SearchBar
            value={searchText}
            onChange={handleSearchChange}
            onSubmit={handleSearchSubmit}
          />
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
        {/* Sidebar for filters, only on catalog view */}
        {view === "catalog" && (
          <FilterSidebar
            categories={CATEGORY_OPTIONS}
            brands={BRAND_OPTIONS}
            compatibilities={COMPATIBILITY_OPTIONS}
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            selectedCompatibility={selectedCompatibility}
            priceRange={PRICE_RANGE}
            selectedPrice={selectedPrice}
            onCategoryChange={handleCategoryChange}
            onBrandChange={handleBrandChange}
            onCompatibilityChange={handleCompatibilityChange}
            onPriceChange={handlePriceChange}
          />
        )}
        {/* Hide sidebar in other views for mobile friendliness */}
        {view !== "catalog" && (
          <aside className="sidebar sidebar-hidden" />
        )}

        <main className="main-content">
          {/* Conditional rendering for "routes" */}
          {view === "catalog" && (
            <Catalog products={filteredProducts} onAddToCart={goToCart} />
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