import React from 'react';

export const getTimeString = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / 1000 / 60 / 60);
    const diffDays = Math.floor(diffMs / 1000 / 60 / 60 / 24);
    if (diffMs < 60 * 60 * 1000) {
        // Less than 1 hour ago
        const diffMinutes = Math.floor(diffMs / 1000 / 60);
        return `${diffMinutes}m`;
    } else if (diffHours < 24) {
        // Less than 1 day ago
        return `${diffHours}h`;
    } else if (diffDays < 7) {
        // Less than 1 week ago
        return `${diffDays} d`;
    } else if (date.getFullYear() === now.getFullYear()) {
        // Same year
        const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    } else {
        // Different year
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
};