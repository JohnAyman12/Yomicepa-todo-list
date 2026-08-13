import { SortOption } from '../../Types/types';
import '../../styles/SortPanel.css';

interface SortPanelProps {
    currentSort: SortOption;
    onSortChange: (sortOption: SortOption) => void;
}

export default function SortPanel({ currentSort, onSortChange }: SortPanelProps) {
    return (
        <div className="sort-panel-container">
            <label htmlFor="sort-select" className="sort-label">
                Sort By:
            </label>
            <select
                id="sort-select"
                value={currentSort}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="sort-select"
            >
                <option value={SortOption.DEFAULT}>📅 Default (Grouped by Date)</option>
                <option value={SortOption.ALPHABETICAL}>🔤 Alphabetical (A - Z)</option>
                <option value={SortOption.DATE}>⏰ Date & Time (Flat)</option>
                <option value={SortOption.PRIORITY}>🔥 Priority (High to Low)</option>
            </select>
        </div>
    );
}