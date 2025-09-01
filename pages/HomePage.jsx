const { Link } = ReactRouterDOM;

export default function HomePage() {
  return (
    <section className="home">
      <div className="welcome-container text-center">
        <h1>Welcome to Miss Books</h1>
        <p>
          Organize your books more effectively with our comprehensive book
          management system.
        </p>
      </div>
      <div className="text-center">
        <Link
          to="/book"
          className="blue-text"
        >
          List of books
        </Link>
      </div>
    </section>
  );
}
