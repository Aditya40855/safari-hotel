// src/components/UserBadge.jsx
import React from 'react';

const UserBadge = ({ type }) => {
  const isGuest = !type || type === 'guest';

  const badgeStyles = {
    backgroundColor: isGuest ? '#f3f4f6' : '#dcfce7',
    color: isGuest ? '#4b5563' : '#166534',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    display: 'inline-block',
    border: `1px solid ${isGuest ? '#e5e7eb' : '#bbf7d0'}`
  };

  return (
    <span style={badgeStyles}>
      {isGuest ? 'Non-Logged' : 'Member'}
    </span>
  );
};

export default UserBadge; // Critical: Allows you to import it in your Admin Panel