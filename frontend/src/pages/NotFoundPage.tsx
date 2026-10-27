import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section aria-labelledby="not-found-title" className="page">
      <p className="eyebrow">404</p>
      <h1 id="not-found-title">Page not found</h1>
      <Link className="back-link" to="/">
        Return home
      </Link>
    </section>
  );
}
