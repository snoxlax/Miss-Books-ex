const { useState, useEffect } = React;
const initialFilter = {
  searchTerm: '',
  minPrice: 0,
  maxPrice: 1000,
};

export default function BookFilter() {
  const [searchTerm, setSearchTerm] = useState(initialFilter);

  return (
    <div className="book-filter mt-4">
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
    </div>
  );
}
