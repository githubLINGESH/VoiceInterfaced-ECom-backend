// components/FilterComponent.js

import React, { useState } from 'react';
import './FilterCategory.css';

const FilterComponent = ({ filters, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (category, value) => {
    const updatedFilters = {
      ...selectedFilters,
      [category]: value,
    };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="filter-container">
      <h3>Filter Options</h3>
      {filters.map((filter) => (
        <div key={filter.category} className="filter-group">
          <h4>{filter.category}</h4>
          <select
            onChange={(e) => handleFilterChange(filter.category, e.target.value)}
            value={selectedFilters[filter.category] || ""}
          >
            <option value="">All</option>
            {filter.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default FilterComponent;
