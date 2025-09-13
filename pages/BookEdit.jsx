import { bookService } from '../services/bookService.js';
import { showSuccessMsg } from '../services/event-bus.service.js';

const { useState } = React;
const { useNavigate } = ReactRouterDOM;

export default function BookEdit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    let convertedValue = value;

    switch (e.target.type) {
      case 'range':
      case 'number':
        convertedValue = +e.target.value;
        break;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: convertedValue,
    }));
  }

  function onSaveBook(e) {
    e.preventDefault();
    bookService
      .addBook(formData.title, formData.price)
      .then(() => navigate('/book'))
      .then(() => showSuccessMsg('Book added successfully'))
      .catch((error) => {
        console.error('Error saving book:', error);
      });
  }

  return (
    <div className="book-edit-container">
      <h2>Add New Book</h2>
      <form
        onSubmit={onSaveBook}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 'fit-content',
        }}
      >
        <div className="mt-4">
          <label htmlFor="title">Book Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter book title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="search-input"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="search-input"
          />
        </div>
        <button
          type="submit"
          className="mt-4"
          style={{ marginLeft: 'auto', display: 'block' }}
        >
          Save Book
        </button>
      </form>
    </div>
  );
}
