import { createPortal } from 'react-dom';
import '../../styles/DeleteModal.css';

interface DeleteModalProps {
    isOpen: boolean;
    taskTitle: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DeleteModal({
    isOpen,
    taskTitle,
    onConfirm,
    onCancel,
}: DeleteModalProps) {
    if (!isOpen) return null;

    return createPortal(
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>⚠️ Delete Task</h3>
                </div>
                <div className="modal-body">
                    <p>
                        Are you sure you want to delete <strong>"{taskTitle}"</strong>?
                    </p>
                    <p className="modal-warning">This action cannot be undone.</p>
                </div>
                <div className="modal-actions">
                    <button type="button" className="btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="button" className="btn-danger" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}