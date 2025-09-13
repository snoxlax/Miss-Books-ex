import './BookFilter.css';

const { useState, useEffect } = React;

export default function BookFilter({ onSetFilter, filterBy }) {
  const [filterTerm, setFilterTerm] = useState({ ...filterBy });

  const onSubmit = (e) => {
    e.preventDefault();
    onSetFilter(filterTerm);
  };

  function handleInputChange(e) {
    const { name, value } = e.target;
    let convertedValue = value;

    switch (e.target.type) {
      case 'text':
        convertedValue = e.target.value;
        break;
      case 'number':
        convertedValue = +e.target.value;
        break;
      default:
        convertedValue = value;
        break;
    }

    setFilterTerm((prevData) => ({
      ...prevData,
      [name]: convertedValue,
    }));
  }

  const { searchTerm, minPrice, maxPrice } = filterTerm;

  return (
    <section className="book-filter">
      <form
        onSubmit={onSubmit}
        className="book-filter-form"
      >
        <input
          className="search-input mt-4 mb-4"
          type="text"
          placeholder="Search books"
          name="searchTerm"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div className="price-inputs">
          <input
            className="price-input"
            type="number"
            placeholder="Min"
            name="minPrice"
            value={minPrice || ''}
            onChange={handleInputChange}
          />
          <span className="price-separator">-</span>
          <input
            className="price-input"
            type="number"
            name="maxPrice"
            placeholder="Max"
            value={maxPrice || ''}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="ml-auto"
          type="submit"
        >
          Search
        </button>
      </form>
    </section>
  );
}
