export default function BookEdit() {
  function onSaveBook(e) {
    e.preventDefault();
    console.log('save book');
  }
  return (
    <form>
      <input
        type="text"
        placeholder="Title"
      />
      <input
        type="text"
        placeholder="Author"
      />
      <input
        type="text"
        placeholder="Price"
      />
      <button
        type="submit"
        onClick={onSaveBook}
      >
        Save
      </button>
    </form>
  );
}
