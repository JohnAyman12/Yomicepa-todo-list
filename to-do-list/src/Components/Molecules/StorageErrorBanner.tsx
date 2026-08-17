import { useTasks } from '../../Context/TaskContext/UseTasks';
import '../../styles/StorageErrorBanner.css';

export default function StorageErrorBanner() {
    const { storageError, clearStorageError } = useTasks();

    if (!storageError) return null;

    return (
        <div className="storage-error-banner" role="alert" aria-live="assertive">
            <div className="banner-content">
                <span className="warning-icon">⚠️</span>
                <p className="banner-text">{storageError}</p>
            </div>
            <button
                type="button"
                className="banner-close-btn"
                onClick={clearStorageError}
                aria-label="Dismiss storage warning"
            >
                ✕
            </button>
        </div>
    );
}