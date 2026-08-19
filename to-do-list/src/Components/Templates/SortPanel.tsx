import { type SortOption, SORT_OPTIONS } from '../../Types/types';
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
                {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}