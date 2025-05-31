import React from 'react';
import '../App.css';

/**
 * PUBLIC_INTERFACE
 * SearchBar component for entering search keywords.
 * Props:
 *  - value: current input value
 *  - onChange: function(e) called when input changes
 *  - onSubmit: function(e) called on form submission
 */
function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form className="navbar-search" onSubmit={onSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Search spare parts..."
        aria-label="Search spare parts"
        value={value}
        onChange={onChange}
      />
      <button className="search-btn" type="submit" aria-label="Submit Search">
        🔍
      </button>
    </form>
  );
}

export default SearchBar;
