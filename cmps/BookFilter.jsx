const { useState, useEffect } = React;

export default function BookFilter({ onSetFilter, filterBy }) {
  const [searchTerm, setSearchTerm] = useState({ ...filterBy });

  const onSubmit = (e) => {
    e.preventDefault();
    onSetFilter(searchTerm);
  };

  return (
    <section className="book-filter mt-4">
      <form
        onSubmit={onSubmit}
        className="book-filter-form"
      >
        <label htmlFor="searchTerm">Search books</label>
        <input
          className="mb-4"
          type="text"
          label="Search books"
          name="searchTerm"
          placeholder="Search books"
          value={searchTerm.searchTerm}
          onChange={(e) =>
            setSearchTerm((prev) => ({ ...prev, searchTerm: e.target.value }))
          }
        />
        <label htmlFor="searchTerm">Min Price</label>
        <input
          className="mb-4"
          type="number"
          placeholder="Min price"
          value={searchTerm.minPrice}
          onChange={(e) =>
            setSearchTerm((prev) => ({ ...prev, minPrice: e.target.value }))
          }
        />
        <label htmlFor="searchTerm">Max Price</label>
        <input
          className="mb-4"
          type="number"
          placeholder="Max price"
          value={searchTerm.maxPrice}
          onChange={(e) =>
            setSearchTerm((prev) => ({ ...prev, maxPrice: e.target.value }))
          }
        />
        <button type="submit">Search</button>
      </form>
    </section>
  );
}
