import React, { useState, useMemo } from 'react';
import './App.css';
import Catalog from './components/Catalog';
import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
// NEW
import LoginRegister from './components/LoginRegister';
import UserAccount from './components/UserAccount';

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

  // Product/filter state
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCompatibility, setSelectedCompatibility] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(PRICE_RANGE.max);

  // CART state and handlers
  const [cart, setCart] = useState([]); // [{product, quantity}]
  const [cartOpen, setCartOpen] = useState(false);

  // USER/MODAL state
  const [user, setUser] = useState(null); // {name, email, orders}
  const [loginRegisterOpen, setLoginRegisterOpen] = useState(false);

  // --- Navigation handlers ---
  const goToCatalog = () => setView("catalog");
  const goToCartPage = () => setView("cart");
  const goToCheckout = () => setView("checkout");
  // When account icon pressed
  const goToAccount = () => {
    if (user) setView("account");
    else setLoginRegisterOpen(true);
  };

  // --- Search/filter handlers ---
  const handleSearchChange = (e) => setSearchText(e.target.value);
  const handleSearchSubmit = (e) => { e.preventDefault(); };
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

  // ---- CART Logic ----
  // PUBLIC_INTERFACE
  function addToCart(product) {
    setCart(prevCart => {
      const idx = prevCart.findIndex(item => item.product.id === product.id);
      if (idx !== -1) {
        // Already in cart: increase quantity
        const newCart = [...prevCart];
        newCart[idx] = { ...newCart[idx], quantity: newCart[idx].quantity + 1 };
        return newCart;
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setCartOpen(true); // open cart drawer
  }

  // PUBLIC_INTERFACE
  function removeFromCart(productId) {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  }

  // PUBLIC_INTERFACE
  function updateCartItemQuantity(productId, newQuantity) {
    setCart(prevCart => prevCart.map(item =>
      item.product.id === productId
        ? { ...item, quantity: Math.max(1, newQuantity) }
        : item
    ));
  }

  // PUBLIC_INTERFACE
  function handleProceedToCheckout() {
    setCartOpen(false);
    setView("checkout");
  }

  // PUBLIC_INTERFACE
  function handleCloseCart() {
    setCartOpen(false);
  }

  // ---- AUTH / ACCOUNT logic ----
  // Called on login/register success
  function handleLoginSuccess(userData) {
    // Optionally, migrate cart/orders logic, for now assume:
    setUser({ ...userData, orders: userData.orders ?? [] });
    setLoginRegisterOpen(false);
    setView("account");
  }

  // Called for logout
  function handleLogout() {
    setUser(null);
    setView("catalog");
  }

  // Update user profile (from dashboard)
  function handleProfileUpdate(newProfile) {
    setUser((cur) => ({
      ...cur,
      name: newProfile.name,
      email: newProfile.email,
    }));
  }

  // Computed badge count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Cart "page" fallback, for mobile/SEO
  function renderCartPage() {
    return (
      <section className="cart-section">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map(({ product, quantity }) => (
              <div key={product.id} style={{ borderBottom: "1px solid #ececec", marginBottom: 13, paddingBottom: 9 }}>
                <b>{product.name}</b> ({quantity}) - ${(product.price * quantity).toFixed(2)}
                <button
                  className="btn btn-small btn-secondary"
                  onClick={() => removeFromCart(product.id)}
                  style={{ marginLeft: 10 }}
                >Remove</button>
              </div>
            ))}
            <div style={{ marginTop: 14, fontSize: 17 }}>
              <b>Total: </b>${cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2)}
            </div>
            <button className="btn" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
          </div>
        )}
        <button className="btn btn-secondary" onClick={goToCatalog}>Back to Catalog</button>
      </section>
    );
  }

  // ---- MAIN RENDER
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
          {/* Account/User icon - changes to "My Account"/Logout if logged in */}
          <button
            className="icon-btn"
            title={user ? `My Account (${user.name})` : "Account"}
            aria-label="Account"
            onClick={goToAccount}
          >
            <span className="icon-account" role="img" aria-label="User">&#128100;</span>
          </button>
          <button
            className="icon-btn"
            title="Cart"
            aria-label="Cart"
            onClick={() => setCartOpen(true)}
          >
            <span className="icon-cart" role="img" aria-label="Cart">&#128722;</span>
            {cartCount > 0 && (
              <span className="cart-count-badge">{cartCount}</span>
            )}
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
        {/* Hide sidebar for non-catalog */}
        {view !== "catalog" && (
          <aside className="sidebar sidebar-hidden" />
        )}

        <main className="main-content">
          {/* Conditional routing */}
          {view === "catalog" && (
            <Catalog
              products={filteredProducts}
              onAddToCart={addToCart}
            />
          )}
          {view === "cart" && renderCartPage()}
          {view === "checkout" && (
            <Checkout
              cart={cart}
              onBackToCatalog={() => {
                setView("catalog");
                setCart([]); // (simulate: clear cart)
              }}
              onCheckoutComplete={() => setCart([])}
            />
          )}
          {/* Main account dashboard for logged-in users */}
          {view === "account" && user && (
            <UserAccount
              user={user}
              onLogout={handleLogout}
              onBack={goToCatalog}
              onProfileUpdate={handleProfileUpdate}
            />
          )}
          {/* After "Account" click, show login/register modal if not logged in */}
        </main>
      </div>
      {/* Modal for login/register */}
      {loginRegisterOpen && (
        <LoginRegister
          open={loginRegisterOpen}
          onClose={() => setLoginRegisterOpen(false)}
          onAuth={handleLoginSuccess}
        />
      )}
      {/* Cart drawer/modal, always accessible */}
      {cartOpen && (
        <Cart
          items={cart}
          onQuantityChange={updateCartItemQuantity}
          onRemove={removeFromCart}
          onCheckout={handleProceedToCheckout}
          onClose={handleCloseCart}
        />
      )}
    </div>
  );
}

export default App;