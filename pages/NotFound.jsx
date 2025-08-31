const { Link } = ReactRouterDOM;

export default function NotFound() {
  return (
    <section className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-title">
          <span className="error-num">404</span>
          <span className="error-text">Page Not Found</span>
        </h1>
        <p className="error-message">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="back-link"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
}
