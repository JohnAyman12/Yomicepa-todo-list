import { Link } from 'react-router-dom';
import ThemeToggle from '../Components/Atoms/ThemeToggle';
import '../styles/NotFoundPage.css';

export default function NotFoundPage() {
    return (
        <div className="not-found-container">
            <header className="not-found-header">
                <ThemeToggle />
            </header>

            <main className="not-found-content">
                <h1 className="not-found-code">404</h1>
                <h2 className="not-found-title">Page Not Found</h2>
                <p className="not-found-message">
                    Oops! The page you are looking for doesn't exist or has been moved.
                </p>

                <Link to="/" className="btn-home">
                    🏠 Return Home
                </Link>
            </main>
        </div>
    );
}