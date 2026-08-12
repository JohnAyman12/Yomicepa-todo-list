import React from 'react';
import { ListActionType } from '../Types/types';
import '../styles/HandleListBtn.css';

interface HandleListBtnProps {
    actionType: ListActionType;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    label?: string; // Optional custom text override
    type?: 'button' | 'submit' ;
    size?: 'small' | 'medium' | 'large';
}

// Map configuration using the enum keys
const ACTION_CONFIG: Record<ListActionType, { defaultLabel: string; icon: string }> = {
    [ListActionType.ADD]: { defaultLabel: 'Add Task', icon: '➕' },
    [ListActionType.DELETE]: { defaultLabel: 'Delete', icon: '🗑️' },
    [ListActionType.EDIT]: { defaultLabel: 'Edit', icon: '✏️' },
};

export default function HandleListBtn({
    actionType,
    onClick,
    label,
    type = 'button',
    size = 'medium',
}: HandleListBtnProps) {
    const config = ACTION_CONFIG[actionType];
    const displayLabel = label ?? config.defaultLabel;

    return (
        <button
            type={type}
            className={`handle-list-btn btn-${actionType} btn-${size}`}
            onClick={onClick}
            aria-label={displayLabel}
        >
            <span className="btn-icon">{config.icon}</span>
            {displayLabel && <span className="btn-label">{displayLabel}</span>}
        </button>
    );
}