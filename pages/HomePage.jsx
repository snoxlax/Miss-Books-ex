const { Link } = ReactRouterDOM;

export default function HomePage() {
  return (
    <section className="home">
      <div className="welcome-container">
        <h1>Welcome to Miss Books</h1>
        <p>
          Organize your books more effectively with our comprehensive book
          management system.
        </p>
      </div>
      <Link
        to="/book"
        style={{ textDecoration: 'none', margin: 'auto' }}
      >
        List of books
      </Link>
    </section>
  );
}
