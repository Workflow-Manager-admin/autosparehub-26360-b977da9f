import React from 'react';
import '../App.css';

/**
 * PUBLIC_INTERFACE
 * FilterSidebar component for product filtering
 * Props:
 *  - categories: array of available categories
 *  - brands: array of available brands
 *  - compatibilities: array of compatibility options
 *  - selectedCategory: string
 *  - selectedBrand: string
 *  - selectedCompatibility: string
 *  - priceRange: { min, max }
 *  - selectedPrice: number
 *  - onCategoryChange, onBrandChange, onCompatibilityChange, onPriceChange: handler functions
 */
function FilterSidebar({
  categories = [],
  brands = [],
  compatibilities = [],
  selectedCategory,
  selectedBrand,
  selectedCompatibility,
  priceRange = { min: 0, max: 1000 },
  selectedPrice,
  onCategoryChange,
  onBrandChange,
  onCompatibilityChange,
  onPriceChange,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Filters</div>
      <div className="sidebar-content">
        <div className="filter-group">
          <div className="filter-label">Category</div>
          <select className="filter-select" value={selectedCategory} onChange={onCategoryChange}>
            <option value="">All Categories</option>
            {categories.map(cat =>
              <option key={cat} value={cat}>{cat}</option>
            )}
          </select>
        </div>
        <div className="filter-group">
          <div className="filter-label">Brand</div>
          <select className="filter-select" value={selectedBrand} onChange={onBrandChange}>
            <option value="">All Brands</option>
            {brands.map(brand =>
              <option key={brand} value={brand}>{brand}</option>
            )}
          </select>
        </div>
        <div className="filter-group">
          <div className="filter-label">Compatibility</div>
          <select className="filter-select" value={selectedCompatibility} onChange={onCompatibilityChange}>
            <option value="">All Compatibilities</option>
            {compatibilities.map(com =>
              <option key={com} value={com}>{com}</option>
            )}
          </select>
        </div>
        <div className="filter-group">
          <div className="filter-label">Max Price: ${selectedPrice}</div>
          <input
            className="filter-input"
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            step="10"
            value={selectedPrice}
            onChange={onPriceChange}
          />
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
